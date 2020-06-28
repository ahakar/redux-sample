
/// https://webpack.github.io/docs/configuration.html

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ENV = process.env.NODE_ENV || 'development';
var BUILD_PATH = process.env.BUILD_PATH && (process.env.BUILD_PATH === 'webapp');

var __PROD__ = (ENV === 'production');

var define_globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(ENV)
  },
  'NODE_ENV'     : ENV,
  '__DEV__'      : !__PROD__,
  '__PROD__'     : __PROD__
};

var babel_query_presets = ['es2015', 'react', 'stage-0'];

if( !__PROD__ ) {
  babel_query_presets.push('react-hmre');
}

 // var output_path = BUILD_PATH ? '../../main/webapp/static' : './dist/static';
var output_path = './dist/static';
var config = {
  name: 'client',
  target: 'web',
  entry: [
    'babel-polyfill',
    './source/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, output_path),
    publicPath: 'static/'
  },
  plugins: [
    new webpack.DefinePlugin(define_globals)
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: [
            'transform-runtime',
            // 'transform-decorators-legacy'
          ],
          presets: babel_query_presets
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'postcss', 'less']
      },
      {
        test: /\.css?$/,
        loaders: ['style', 'postcss', 'raw']
      },
      {
        test: /\.woff2{0,1}$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(otf|eot|png|svg|ttf|woff|woff2|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
};

console.log(' __PROD__', __PROD__, '__dirname',__dirname);
///
if( __PROD__ ) {
  /// production

  config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        drop_console: true
      }
    }),
    new HtmlWebpackPlugin({
      template: 'index.template.html',
      filename: 'index.html',
      // inject: 'body',
      // minify: { collapseWhitespace: true }
    })
  );

  /// Apply ExtractTextPlugin to CSS loaders
  config.module.loaders.filter(loader => (
    loader.loaders && loader.loaders.find(name => /css/.test(name.split('?')[0]))
  )).forEach(loader => {
    console.log('ExtractTextPlugin', loader);
    var first = loader.loaders[0];
    var rest = loader.loaders.slice(1);
    console.log('ExtractTextPlugin1', first, " :: ", rest);
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'), { publicPath: '' });
    console.log('ExtractTextPlugin2', loader);
    delete loader.loaders;
  });

  config.plugins.push(
    new ExtractTextPlugin('styles.[hash].css', {
      allChunks: true
    })
  );

  console.info("\u001b[1m==> Compile: Below directory contains generated index.html and static files\u001b[22m");
  console.info("\u001b[1m\u001b[32m"+ config.output.path +"\u001b[39m\u001b[22m \n");

} else {
  /// development

  config.devtool = 'source-map';

  config.entry.push(
    'event-source-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr'
  );

  config.output = {
    filename: 'bundle.js',
    path: path.join(__dirname, '../static'),
    publicPath: '/static/'
  };

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
}

 console.log('webpack:ENV:', ENV, __PROD__, config);

module.exports = config;

'use strict';

let express = require('express');
let proxy = require('proxy-middleware');
let path = require('path');
let url = require('url');

let webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');

var PROD_ENV = (process.env.NODE_ENV === 'production');
// console.log('env:', PROD_ENV);

/// 1. app
// let app = express();
let app = require('./app');

const config = require('../webpack.config');
const port = process.env.PORT || 3000;

/// 2. serve index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')) );

// proxy java web service requests to tomcat on port 8080
// app.use('/json', proxy(url.parse('http://localhost:8080/context-path/api')));

app.use('/vendor', express.static(path.join(__dirname, '../vendor')));

/// 3. webpack config
// if (PROD_ENV) { app.use('/static', express.static('../static')); } else {}
let compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

/// 4. access app via browser on port
app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(
      "\u001b[1m\u001b[32m"
      + '=> Open http://localhost:%s/ in browser. Ctrl+C to stop.'
      + "\u001b[39m\u001b[22m \n",
      port
    );
  }
});

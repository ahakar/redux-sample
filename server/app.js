'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let fs = require('fs');

/// 1. read mock data
const dirPath = path.join(__dirname, '../data');

function readFile(filePath, cb) {
  fs.lstat(filePath, function(err, stats) {
    if (err) return cb(err);
    if( stats.isFile() ) {
      fs.readFile(filePath, (err, data) => {
        if (err) return cb(err);
        try {
          cb(null, data);
        } catch (exception) {
          cb(exception);
        }
      });
    }
  });
}

/// 2.
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, '../data')));

/// 3. api router
let router = express.Router();

router
.get(/^\/([\w\/]+)/, (req, res) => {
  delete req.query._;
  getData(req,
    data => res.json(data),
    err => res.status(404).json(err)
  );
})
.post(/^\/([\w\/]+)/, (req, res) => {
  getData(req,
    data => res.json(data),
    err => res.status(404).json(err)
  );
});

function getData(req, onSuccess, onError) {
  const params = req.params;
  let key = params && (params.key || params[0]);
  console.log(req.method +':', key, req.query, req.body);

  key = key.replace(/\//g, '_') +'.json';
  const filePath = path.join(dirPath, '/', key);

  readFile(filePath, (err, data) => {
    if (err) onError(err);
    else onSuccess(JSON.parse(data));
  });
}

/// call served below /api
app.use('/api', router);

module.exports = app;

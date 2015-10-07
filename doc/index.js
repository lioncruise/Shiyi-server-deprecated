'use strict';

var urllib = require('urllib');
var fs = require('co-fs-extra');
var path = require('path');
var server = require('../server');
var superagent = require('superagent');
var config = require('../config');
var urls = require('./urls');
var co = require('co');
var util = require('util');
var debug = require('debug')('doc/index');
var process = require('process');

server.listen(config.port);

var host = "http://localhost:" + config.port;

var agent = function(url, method, note, input) {
  return function(callback) {
    if (method === 'delete') {
      method = 'del';
    }

    if (input) {
      superagent[method](host + url)
        .send(input)
        .end(function(err, res) {
          if (err) {
            return callback(err);
          }
          callback(null, getFileString(url, method, note, input, res.body));
        });
    } else {
      superagent[method](host + url)
        .end(function(err, res) {
          if (err) {
            return callback(err);
          }
          callback(null, getFileString(url, method, note, null, res.body));
        });
    }
  };
};

var getFileString = function(url, method, note, input, output) {
  var fileString = util.format("url: '%s'\n\n", url);
  fileString += util.format("method: '%s'\n\n", method);

  if (note) {
    fileString += '备注: \n';
    fileString += JSON.stringify(note, null, '\t');
  }

  if (input) {
    fileString += 'input: \n';
    fileString += JSON.stringify(input, null, '\t');
  }
  fileString += '\n\noutput: \n';
  fileString += JSON.stringify(output, null, '\t');

  return fileString;
};

var processes = function*() {
  yield fs.remove(path.join(__dirname, 'examples'));

  for (var i = 0; i < urls.length; i++) {
    var url = urls[i];

    var fileString = '';

    if (url.input && url.input.length) {
      for (var j = 0; j < url.input.length; j++) {
        fileString += ((yield agent(url.url, url.method, url.note, url.input[j])) + '\n\n');
      }
    } else {
      fileString += (yield agent(url.url, url.method, url.note, url.input)) ;
    }

    var filePath = path.join(__dirname, 'examples', url.method + '  ' + url.url.substring(1).replace(/\//g, '-').replace(/\?/g, '-').replace(/=/g, '-') + '.txt');
    yield fs.outputFile(filePath, fileString);

    debug(url.method + ' ' + url.url + ' doc build finish.');
  }

  process.exit(0);
};

function onerror(err) {
  console.error(err.stack);
}

co(processes).catch(onerror);
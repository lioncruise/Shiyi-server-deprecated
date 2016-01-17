'use strict';

const fs = require('co-fs-extra');
const urllib = require('urllib');
const process = require('process');
const path = require('path');
const util = require('util');
const co = require('co');
const server = require('../server');
const config = require('../config');
const content = require('./content');
const debug = require('debug')('doc/index');

server.listen(config.port);

const host = `http://localhost:${config.port}`;

const eachFile = function*({ fileName, func, note, requests }) {
  let fileString = `接口功能： ${func}\n\n备注：\n${note ? note.join('\n') : ''}\n\n`;

  for (let { method, url, data, info } of requests) {
    const result = yield urllib.requestThunk(host + url, {
      method,
      data,
      dataType: 'json',
    });

    fileString = fileString + `\n请求接口： ${url}\n请求动作：${method}\n` + (info ? `备注：\n${info}\n` : '') + (data ? `发送内容:\n${JSON.stringify(data, null, '\t')}\n` : '') + `返回内容: \n${JSON.stringify(result.data, null, '\t')}\n`;
  }

  const filePath = path.join(__dirname, '../../../shiyi-doc/', fileName);
  yield fs.outputFile(filePath, fileString);
};

function onerror(err) {
  console.error(err.stack);
}

exports.run = co.wrap(function*() {
  for (let file of content) {
    yield eachFile(file);
  }

  process.exit(0);
});

exports.run().catch(onerror);

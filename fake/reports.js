'use strict';

var db = require('../src/db');
var debug = require('debug')('fake/reports');

var reports = [];

reports.push({
  ReporterId: 2,
  status: 'pending',
  UserId: 3
});

reports.push({
  ReporterId: 3,
  status: 'pending',
  UserId: 2
});

reports.push({
  ReporterId: 1,
  status: 'pending',
  UserId: 2
});

reports.push({
  ReporterId: 2,
  status: 'pending',
  UserId: 1
});

exports.fake = function*() {
  yield reports.map(function(report) {
    return db.models.Report.create(report);
  });
  debug('reports data fake finish.');
};

exports.fakeData = reports;
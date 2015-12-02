'use strict';

module.exports = {
  db: {
    host: '127.0.0.1',
    database: 'shiyi',
    dialect: 'mysql',
    username: 'root',
    password: 'admin',
    pool: {
      max: 100,
      min: 0,
      idle: 5000,
      maxConnections: 100,
      minConnections: 0,
      maxIdleTime: 5000,
    },
    logging: false,
  },
};

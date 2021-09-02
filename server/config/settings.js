'use strict';

module.exports = {
  api: {
    FDA_KEY: process.env.FDA_KEY || 'DEMO_KEY',
  },
  server: {
    port: process.env.PORT || '5000',
    host: process.env.HOST || 'localhost'
  },
  mongo: {
    mongoURL: process.env.MONGODB_URI || 'localhost',
    mongoUser : process.env.MONGODB_USER || '',
    mongoPass : process.env.MONGODB_PASS || '',
    mongoDBName : process.env.MONGODB_DB_NAME || 'test',
    replicaSet : process.env.MONGODB_REPLICA_SET_NAME || 'rs0'
  },
  log4js: {
      traceLogConfig: {
        appenders: {
          access: {
            type: "dateFile",
            filename: "log/access.log",
            pattern: "-yyyy-MM-dd",
            category: "http"
          },
          app: {
            type: "file",
            filename: "log/app.log",
            maxLogSize: 10485760,
            numBackups: 3
          },
          console: {
            type: "console",
          },
          errorFile: {
            type: "file",
            filename: "log/errors.log"
          },
          errors: {
            type: "logLevelFilter",
            level: "ERROR",
            appender: "errorFile"
          }
        },
        categories: {
          default: { appenders: [ "console", "errors" ], level: "TRACE" },
          http: { appenders: [ "access"], level: "ERROR" }
        }
      }
  }
};

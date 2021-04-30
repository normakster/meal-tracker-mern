'use strict';

const appSettings = {
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

module.exports = appSettings;

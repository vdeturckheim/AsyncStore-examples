'use strict';
const logger = require('./logger');
let asyncContext, errMiddleware;
module.exports.bindApp = function (app, errorMiddleware) {
    asyncContext = app.asyncContext;
    errMiddleware = errorMiddleware;
};

process.setUncaughtExceptionCaptureCallback((err) => {
    logger.log('uncaught exception', err.message);
    const req = asyncContext.getStore().get('req');
    const res = asyncContext.getStore().get('res');
    return errMiddleware(err, req, res);
});

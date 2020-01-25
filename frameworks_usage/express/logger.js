'use strict';
let asyncContext;
module.exports.bindApp = function (app) {
    asyncContext = app.asyncContext;
};

module.exports.log = function (...args) {
    const req = asyncContext.getStore().get('req');
    console.log(req.method, req.path, ...args);
};

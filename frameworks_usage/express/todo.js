'use strict';
const wreck = require('@hapi/wreck');
const logger = require('./logger');

let asyncContext;
module.exports.bindApp = function (app) {
    asyncContext = app.asyncContext;
};

module.exports.getTodo = async function (todoId) {
    logger.log(`PERFORMING GET`, `https://jsonplaceholder.typicode.com/todos/${todoId}`);
    const req = asyncContext.getStore().get('req');
    const {payload} = await wreck.get(`https://jsonplaceholder.typicode.com/todos/${todoId}`, { headers: { 'x-tracing-id': req.id } });
    return JSON.parse(payload.toString());
};

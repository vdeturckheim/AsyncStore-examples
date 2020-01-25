'use strict';
require('userland-async-context');
const { AsyncContext } = require('async_hooks');
const app = require('express')();
app.asyncContext = new AsyncContext();

const logger = require('./logger');
logger.bindApp(app);
const todo = require('./todo');
todo.bindApp(app);

app.use((req, res, next) => {
    req.id = Math.floor(Math.random() * 10000);
    app.asyncContext.run((store) => {
        store.set('req', req);
        store.set('res', res);
        next();
    });
});

app.get('/todos/:id', (req, res, next) => {
    todo.getTodo(req.params.id)
        .then((x) => res.json(x))
        .catch(next);
});

app.get('/fail', () => {
    process.nextTick(() => {
        throw new Error('catch me if you can.');
    });
});

const errMiddleware = function (err, req, res, next) {
    logger.log(err);
    return res.end(err.message);
};
require('./error').bindApp(app, errMiddleware);
app.listen(8080, () => {
    console.log('app running');
});

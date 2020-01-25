# Example of Express integration for AsyncContext

## Setup
```shell script
$ npm install
$ node index.js
```

Application will listen on port 8080

## Usage

### fetching a remote object

```shell script
$ curl http://localhost:8080/todos/10
```
This will log
```
GET /todos/10 PERFORMING GET https://jsonplaceholder.typicode.com/todos/10
```
The logger will implicitly know the current incoming HTTP transaction.
The log call was is:
```js
logger.log(`PERFORMING GET`, `https://jsonplaceholder.typicode.com/todos/${todoId}`);
```
Also, the outgoing HTTP request has a header named `'x-tracing-id'` that automatically has the
value of `req.id`.

### Error management
```shell script
$ curl http://localhost:8080/fail
```
will log
```
GET /fail uncaught exception catch me if you can.
GET /fail Error: catch me if you can.
    at /Users/vdeturckheim/Projects/AsyncStore-examples/frameworks_usage/express/index.js:29:15
    at processTicksAndRejections (internal/process/task_queues.js:79:11)
```

In this case, an error is thrown but a handler managed to link it to a certain HTTP transaction
and to call the error middleware on it.




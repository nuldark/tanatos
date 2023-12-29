const http = require('http');
const { Application } = require("../build/dist");

const app = new Application();

app.use(async (req, res, next) => {
    console.log('middleware 1');
    next();
});

app.use(async (req, res, next) => {
    console.log('middleware 2');
    next();
});

app.start().then(cb => http.createServer(cb).listen(8000));
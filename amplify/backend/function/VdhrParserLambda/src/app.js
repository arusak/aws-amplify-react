const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const {parse} = require('date-fns');

const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.get('/:date', function (req, res) {
    const date = parse(req.params.date, 'yyyy-MM-dd', new Date());
    res.json({date: date.toString()});
});

app.listen(3000, function () {
    console.log('App started');
});

module.exports = app;

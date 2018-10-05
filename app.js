'use strict';

const express = require('express');
//Create the application object
const app = express();
const routes = require('./routes/routes');
const jsonParser = require('body-parser').json;
const logger = require('morgan');

app.use(logger('dev'));
app.use(jsonParser());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/qa');
const db = mongoose.connection;

db.on('error', err => {
    console.error('Connection error:', err);
});

db.once('open', () => {
    console.log('DB connecton successful');
});

app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	if(req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
		return res.status(200).json({});
	}
	next();
});

app.use('/questions', routes);

//Handle 404 and forward it to error handler
app.use((res, req, next) => {
    const err = new Error('Not Found!');
    err.status =404;
    next(err);//calling next() with a parameter, signals to express that an error has occured.
});

//Error Handler - Error handlers take 4 params
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

//Specify the port to serve the app on
const port = process.env.PORT || 3000;
//Start the server
app.listen(port, () => console.log(`Express server is listening on port ${port}`)); 


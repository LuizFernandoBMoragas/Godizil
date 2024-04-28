require('dotenv').config({ path: `${process.cwd()}/env` });

const express = require('express');

const authRouter = require('./route/authRoute.js');
const catchAsync = require('./utils/catchAsync.js');
const serverError = require('./utils/serverError.js');
const globalErrorHandler = require('./controller/errorController.js');

const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).json({
        status: "Working",
        Message: "Wohoo, the server is up and running"
    });
});

app.use('/api/v1/auth', authRouter);

app.use('*', catchAsync(async (req, res, next)=>{
    throw new serverError ('this is errorr!', 404)
}));

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 3333;

app.listen(PORT, ()=>{
    console.log('Server is up and running!', PORT);
});
require('dotenv').config({ path: `${process.cwd()}/env` });

const express = require('express');

const authRouter = require('./route/authRoute.js');

const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).json({
        status: "Working",
        Message: "Wohoo, the server is up and running"
    })
});

app.use('/api/v1/auth', authRouter)

app.use('*', async (req, res, next)=>{
    return next(new Error('this is error!')); //for async we need to use the next function to handle the error.
    // throw new Error('this is error!');
    // res.status(404).json({
    //     status: "Fail",
    //     message: "Route not found"
    // })
})

app.use((err, req, res, next)=>{
    res.status(404).json({
        status: 'Error',
        message: err.message
    })
})

const PORT = process.env.APP_PORT || 3333;

app.listen(PORT, ()=>{
    console.log('Server is up and running!', PORT);
})
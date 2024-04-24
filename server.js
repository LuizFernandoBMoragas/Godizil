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

app.use('*', (req, res)=>{
    res.status(404).json({
        status: "Fail",
        message: "Route not found"
    })
})

const PORT = process.env.APP_PORT || 3333;

app.listen(PORT, ()=>{
    console.log('Server is up and running!', PORT);
})
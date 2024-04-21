const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.status(200).json({
        "status": "Working",
        "message": "Good, server is up and running"
    })
});

app.listen(3333, ()=>{
    console.log('Server is up and running')
})
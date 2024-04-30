const serverError = require('../utils/serverError');

require('dotenv').config({path: `${process.env.cwd}/env`});

const sendErrorDev = (error, res) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || 'error';
    const message = error.message;
    const stack = error.stack;

    res.status(statusCode).json({
        status,
        message,
        stack,
    });
};

const sendErrorProd = (error, res) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || 'error';
    const message = error.message;
    const stack = error.stack;

    if (error.isOperational){
        return res.status(statusCode).json({
            status,
            message,
        });
    };

    return res.status(500).json({
        status: 'error',
        message: 'something went very wrong'
    });

};

const globalErrorHandler = (err, req, res, next) => {
    if(err.name === 'SequelizeUniqueConstraintError'){//Solve problem for when someone is trying to create another account with the same email
        err = new serverError(err.errors[0].message, 400);
    }
    if(process.NODE_ENV === 'development'){
        return sendErrorDev(err, res);
    }
    sendErrorProd(err, res);
};

module.exports = globalErrorHandler;
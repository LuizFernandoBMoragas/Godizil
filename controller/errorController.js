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
    if(process.NODE_ENV === 'development'){
        return sendErrorDev(err, res);
    }
    sendErrorProd(err, res);
};

module.exports = globalErrorHandler;
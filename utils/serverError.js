class serverError extends Error {
    constructor(message, statusCode){
        super(message)//passa a mensagem para a classe pai
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4) ? 'Fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);

    }
}

module.exports = serverError;
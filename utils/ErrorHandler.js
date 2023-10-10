//custom class for error handling
class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorHandler;
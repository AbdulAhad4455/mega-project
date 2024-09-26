class ApiError extends Error {
    constructor(
        statusCode,
        message = "Somthing is Wrong",
        errors = [],
        statck = ""

        
    ){
        super(message)
        this.statusCode =statusCode,
        this.data = null,
        this.message = message,
        this.success = false,
        this.errors =errors

        if(statck){
            this.stack= this.stack
        }else {
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}
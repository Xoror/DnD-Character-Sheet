export const apiErrorParse = (error) => {
    if(error.status === undefined) {
        let errorObj = {
            status: error.name,
            code: error.code,
            message: error.message
        }
        if(errorObj.status === "AbortError" && errorObj.code === 20 && errorObj.message === "The operation was aborted. ") {
            errorObj.status = "TimeoutError"
            errorObj.message = "The operation timed out and was aborted. Please try again or contact us if the issue persists!"
        }
        return errorObj
    }
    else {
        return error
    }
}
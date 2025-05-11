//All the errors are log in this format

class ApiErrors extends Error{
    constructor(
        statusCode,
        message="Something Went Wrong",
       
        


    )
    {
        super(message)
        this.statusCode=statusCode
        this.message=message
        
        this.success=false
    }
}


export default ApiErrors
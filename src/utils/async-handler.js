//Handler function to avoid try-catch block

const asyncHandler=(handlerFunction)=>{
    return (req,res,next)=>{
        Promise.resolve(handlerFunction(req,res,next))
        .catch(function(err){
            next(err)
        })
    }
}

export {asyncHandler}
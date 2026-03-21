const asyncHandler = (controllerFunction) => {
    return async (req,res,next)=>{
        try{
            await controllerFunction(req,res,next)
        }catch(err){
            next(err)
        }
    }
}

export { asyncHandler }
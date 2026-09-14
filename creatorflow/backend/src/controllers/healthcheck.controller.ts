import type { Request,Response,NextFunction } from "express"

const healthCheck= (
    req:Request
    ,res:Response
    ,next:NextFunction
)=>{
    try {
        res.status(200).json({message : "serveris running"})
    } catch (error) {
        next(error)
    }
}

export {healthCheck}
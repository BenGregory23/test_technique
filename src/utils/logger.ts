import type { Request, Response } from "express"

const log = (message:string, debug:boolean = false) => {
    const logMessage = `[${new Date().toISOString()}] ${message}`
    
    if(debug){
        console.log("****DEBUG****" + logMessage)
        return     
    } 

    console.log(logMessage)
}

const logMiddleware = (req:Request, res:Response,next:any) => {
    const logMessage = `[${new Date().toISOString()}] ${req.url}`

    console.log(logMessage)

    // go to next node
    next()
}


export{
    log,
    logMiddleware
}
import type { Request, Response } from "express"

/**
 * Logs data into the console
 * @param message String of the content to be logged
 * @param debug Boolean to use a debug indication in the console.
 */
const log = (message:string, debug:boolean = false) => {
    const logMessage = `[${new Date().toISOString()}] ${message}`
    
    if(debug){
        console.log("****DEBUG****" + logMessage)
        return     
    } 

    console.log(logMessage)
}

/**
 * Logs all requests made to the server
 * @param req Express Request object containing all informations
 * @param res Express Response object
 * @param next Function to go to the next node of the server
 */
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
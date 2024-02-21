
const log = (message:string, debug:boolean = false) => {
    const logMessage = `[${new Date().toISOString()}] ${message}`
    
    if(debug){
        console.log("****DEBUG****" + logMessage)
        return     
    } 

    console.log(logMessage)
}

const logMiddleware = (req, res,next) => {
    const logMessage = `[${new Date().toISOString()}] ${req.url}`

    console.log(logMessage)

    next()
}


export{
    log,
    logMiddleware
}
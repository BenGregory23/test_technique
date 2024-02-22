import express from 'express';
import {logMiddleware} from "./src/utils/logger"
import {router as companiesRouter} from "./src/controllers/companies"
import {router as jobsRouter} from "./src/controllers/jobs"
import type { Request,Response } from 'express';


const app = express();
const port = process.env.PORT

/**
 * Auto logging of requests
 */
app.use(logMiddleware)
app.use(companiesRouter)
app.use(jobsRouter)



app.get("/",(req:Request, res:Response)=>{
    
    res.send("Hello World!")
})


app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
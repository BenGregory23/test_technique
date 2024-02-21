import express from 'express';
import type { Request, Response } from 'express';
import {log, logMiddleware} from "./src/utils/logger"


const app = express();

const port = process.env.PORT
const pappers_api_key = process.env.PAPPERS_API_KEY
const pappers_api_url = process.env.PAPPERS_API_URL || ".ENV MISSING"

app.use(logMiddleware)

app.get('/company', async (req: Request, res: Response) => {
    // get SIREN param
    const { siren } = req.query
    if(siren === null || siren === "" || siren == undefined ){
        res.send("No SIREN number provided.").status(400)
        return
    } 

    const url = `${pappers_api_url}entreprise/cartographie?api_token=${pappers_api_key}&siren=${siren}`
    log(url, true)
    
    // TODO fetch data from Pappers using the SIREN
    // and return a jobId

    const result = await fetch(url)
    const data = await result.json()


    res.send(data)
})


/**
 * @returns all the jobs that are in progress.
 */
app.get('/jobs', (req:Request, res:Response)=>{
    // Idée : récupérer tout les job enregistrés dans webhook.site

    res.send("TODO : return jobs in progress")
})

/**
 * 
 * @returns the job with the id sent as a param.
 */
app.get('/jobs/:id',(req:Request, res:Response)=>{
    
    res.send("Information about job number : " + req.params.id )
})


app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
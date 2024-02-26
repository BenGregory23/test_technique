import express from "express";
import type { Request, Response } from "express";
import { jobManagerInstance } from "../services/jobs";

const router = express.Router()


/**
 * @returns the jobs that are in progress.
 */
router.get('/jobs', (req:Request, res:Response)=>{
    // Idée : récupérer tout les job enregistrés dans webhook.site
    const jobsInProgress = jobManagerInstance.getJobs()
    res.send(jobsInProgress)
})


export {router}
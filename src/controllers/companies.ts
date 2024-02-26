import express from "express";
import type { Request, Response } from "express";
import { log } from "../utils/logger";
import { fetchCompany, getCompanies } from "../services/companies";
import generateJobID from "../utils/generateJobID";
import { sendToWebhook } from "../services/jobs";

const router = express.Router()

/**
 *  GET /company
 *  @param siren : SIREN number of a company
 *  @returns a job ID and the SIREN number
 *  @description Fetches a company from the Pappers API using the SIREN number
 */
router.get('/company', async (req: Request, res: Response) => {
    const { siren } = req.query
    const jobId = generateJobID()
    if (siren === null || siren === "" || siren == undefined) {
        res.send("No SIREN number provided.").status(400)
        return
    }

    const company : object | null = await fetchCompany(siren)
    if(company === null){
        res.status(404).send("Not Found")
        return
    } 
    // Get all companies linked to members
    const companies : Set<object> = await getCompanies(company)

    // Sending companies to the Webhook.site asynchronously
    // and registering a job as in progress
    sendToWebhook(companies,jobId)
    
    // Returning a job ID and the SIREN number
    const returned_data = {
        jobId: jobId,
        SIREN: siren,
    }
    res.send(returned_data)
})

export { router } 
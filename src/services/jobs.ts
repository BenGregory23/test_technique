import { log } from "../utils/logger";

interface JobManager {
    jobs: string[]
}

class JobManager {
    constructor() {
        this.jobs = [];
    }

    addJob(jobId: string) {
        this.jobs.push(jobId);
    }

    removeJob(jobId: string) {
        this.jobs = this.jobs.filter((job) => job !== jobId);
    }

    getJobs() {
        return this.jobs;
    }
}

// Create a singleton instance
const jobManagerInstance = new JobManager();


/**
 * Sends the companies to a Webhook
 * @param companies  Set of companies
 * @param jobId  Job ID
 */
const sendToWebhook = async (companies: Set<object>, jobId: string) => {
    const companiesArray = Array.from(companies)
    const url = process.env.WEBHOOK_URL || null

    try {
        if (url === null) throw new Error("Missing WebHook URL")


        jobManagerInstance.addJob(jobId)


        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(companiesArray),
        })
            .then((res) => {
                // Delay is added to simulate a long request time
                setTimeout(() => {
                    // request is finished remove job 
                    jobManagerInstance.removeJob(jobId)
                }, 10000)
            })
    }
    catch (err: any) {
        log(err)
    }

}







export {
    sendToWebhook,
    jobManagerInstance
}
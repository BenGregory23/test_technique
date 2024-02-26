
/**
 * Simple uuid generator
 * @returns 
 */
const generateJobID = () => {
    
    return crypto.randomUUID()
}

export default generateJobID
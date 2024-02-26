const pappers_api_key = process.env.PAPPERS_API_KEY
const pappers_api_url = process.env.PAPPERS_API_URL || ".ENV MISSING"

/**
 * Takes an initial company and fetches any company linked to its members.
 * @param company Object representing a Pappers company
 * @returns array of companies
 */
const getCompanies = async (company: object) => {
    // Using a set prevents companies appearing multiple times
    const companies = new Set<object>()
    const possibleCompanies: Object[] = company.entreprises;
    const linksCompanyMember = company.liens_entreprises_personnes
    const companySIRENs : String[] = []


    possibleCompanies.forEach((comp)=>{
        linksCompanyMember.forEach((link)=>{
            if(link[0] == comp.id){
                companySIRENs.push(comp.siren)
            }
        })
    })

    // If no company is linked to members, we just return the initial company
    if(companySIRENs.length === 0){
        companies.add(company)
        return companies
    } 


    /**
     * For each SIREN stored in companySIRENs array
     * we fetch the company and store it
     */
    for(const siren of companySIRENs){
        const company = await fetchCompany(siren)
        companies.add(company)
    }

    return companies
}


/**
 * Fetches a company from the Pappers API using the SIREN
 * @param SIREN identifier for a company
 * @returns a Pappers company object
 */
const fetchCompany = async (SIREN: number | string | any) => {
    // To avoid a 404 because of whitespaces not removed by the user
    if(typeof SIREN === "string"){ 
        SIREN = SIREN.replace(/\s/g, "")
    }
    const url = `${pappers_api_url}entreprise/cartographie?api_token=${pappers_api_key}&siren=${SIREN}`
    const result = await fetch(url)
    console.log(result)
    if(result.status !== 200) return null

    const company : object = await result.json()
    console.log(company)
    return company
}

export {
    getCompanies,
    fetchCompany
}
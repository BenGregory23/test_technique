const pappers_api_key = process.env.PAPPERS_API_KEY
const pappers_api_url = process.env.PAPPERS_API_URL || ".ENV MISSING"

/**
 * Takes an initial company and fetches any company linked to its members.
 * @param company Object representing a Pappers company
 * @returns array of companies
 */
const getLinkedCompanies = async (company: object) => {
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
     
    const url = `${pappers_api_url}entreprise/cartographie?api_token=${pappers_api_key}&siren=${SIREN}`
    const result = await fetch(url)
   
    if(result.status !== 200) return null

    const company : object = await result.json()
    return company
}

export {
    getLinkedCompanies,
    fetchCompany
}

const httpClientPlugin = {
    get: async (url:string) => {
        const response = await fetch(url)
        const data = await response.json()
        return data
    }
}

module.exports = httpClientPlugin
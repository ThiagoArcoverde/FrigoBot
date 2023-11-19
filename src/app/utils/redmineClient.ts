export default class redmineClient {
    private static apiURL: string = 'http://192.168.0.246'

    static async getIssue(issueID: string, apiKey: string): Promise<any> {
        const url = `${this.apiURL}/issues/${issueID}.json`

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Redmine-API-Key': apiKey,
                },
            });
            let data
            if(response.status === 200){
                return await response.json()
            }
            return data = {status: response.status}
            
        } catch (error) {
            console.log("Erro ao buscar issue: " + error)
        }
    }

}
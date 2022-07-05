import axios from "axios";

const httpclient = axios.create({
    baseURL: 'http://localhost:8080'
})

class ApiService {

    constructor(apiurl){
        this.apiurl = apiurl;
    }

    post(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
        return httpclient.post(requestUrl, objeto);
    }

    put(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
        return httpclient.put(requestUrl, objeto);
    }

    delete(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpclient.delete(requestUrl);
    }

    get(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpclient.get(requestUrl);
    }
}

export default ApiService;
import axios from "axios";

const httpclient = axios.create({
    baseURL: 'http://localhost:8080'
})

class ApiService {

    constructor(apiurl){
        this.apiurl = apiurl;
    }

    post(url, objeto) {
        return httpclient.post(url, objeto);
    }

    put(url, objeto) {
        return httpclient.put(url, objeto);
    }

    delete(url){
        return httpclient.delete(url);
    }

    get(url){
        return httpclient.get(url);
    }
}

export default ApiService;
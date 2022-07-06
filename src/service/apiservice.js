import axios from "axios";

const httpclient = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})

class ApiService {

    constructor(apiurl){
        this.apiurl = apiurl;
    }

    static registrarToken(token){
        if(token){
            httpclient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
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
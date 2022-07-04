import ApiService from "./apiservice";

class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuarios')
    }

    autenticar(crediciais){
        return this.post('/autenticar', crediciais)
    }
}

export default UsuarioService;
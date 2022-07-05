import React from "react";

import AuthService from "../service/authService";

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer;
const AutProvider = AuthContext.Provider;

class ProvedorAutenticacao extends React.Component{
    
    state = {
        usuarioAutenticado: null,
        isAutenticado: false
    }

    iniciarSessao = (usuario) => {
        console.log("cheguei em iniciar Sessao", usuario)
        AuthService.logar(usuario);
        this.setState({ isAutenticado: true, usuarioAutenticado: usuario })
    }

    encerrarSessao = () => {
        AuthService.removerUsuarioAutenticado();
        this.setState({ isAutenticado: false, usuarioAutenticado: null })
    }

    async componentDidMount(){
        const isAutenticado = AuthService.isUsuarioAutenticado()
        if(isAutenticado){
            const usuario = await AuthService.refreshSession()
            this.setState({
                isAutenticado: true,
                usuarioAutenticado: usuario,
            })
        }else{
            this.setState( previousState => {
                return {
                    ...previousState  
                }
            })
        }
    }

    render(){
        const contexto = {
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        }

        return(
            <AutProvider value={contexto}>
                {this.props.children}
            </AutProvider>
        )
    }
}

export default ProvedorAutenticacao
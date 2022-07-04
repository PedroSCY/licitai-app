import React from "react";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import UsuarioService from "../Service/usuarioService";
import Router from "../router/Router";

class Login extends React.Component {

  state = {
    email: '',
    senha: ''
  }

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  Entrar = () => {
      this.service.autenticar({
          email: this.state.email,
          email: this.state.senha
      }).then( response => {
        
        localStorage.setItem('_usuario_logado', JSON.stringify(response.data) )
        console.log(response)
      }).catch( erro => {
        alert(erro.response.data)
      })

  }



  render() {


    const StyledTextField = withStyles({
      root: {
        '& label.Mui-focused': {
          color: '#14887c',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#14887c',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#14887c',
          },
          '&:hover fieldset': {
            borderColor: '#14887c',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#14887c',
          },
        },
      },
    })(TextField);


    return (
      <div className="pb-4">
        <form >
          <div className="form-group ">
            <StyledTextField
              className="form-control"
              id="email"
              name="email"
              label="Email"
            />
          </div>
          <div className="form-group">
            <StyledTextField
              className="form-control mt-2"
              id="password"
              name="password"
              label="Password"
              type="password"
            />

          </div>

          <div className="d-flex justify-content-between mt-2 mb-2 align-self-center">
            <this.props.DropdownItem goToMenu='recuperaremail'>
              Esqueceu a senha?
            </this.props.DropdownItem>
            <button type="submit" className="btn btn-primary " name="itensLogin">Entrar</button>
          </div>

        </form>
      </div>
    )
  }
}

export default Login

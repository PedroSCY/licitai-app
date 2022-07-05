import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import UsuarioService from '../service/usuarioService'
import LocalstorageService from "../service/localstorageService"
import { mensagemErro, mensagemAlert, mensagemSucesso } from "./toastr";

import { AuthConsumer } from "../main/provedorAutenticacao";


const service = new UsuarioService();

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

const validationSchema = yup.object({
    email: yup
      .string('Coloque seu email')
      .email('Digite um email Valido')
      .required('Campo Obrigatorio'),
    password: yup
      .string('Coloque sua senha')
      .min(4, 'Sua senha deve conter no mininimo 4 caracteres')
      .required('Campo Obrigatorio'),
  });

function Login(props) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
      
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          service.autenticar({
            email: values.email,
            senha: values.password
            }).then( response => {
              props.iniciarSessao(response.data)
              mensagemSucesso(`Login Completo.`)
            }).catch( erro => {
              mensagemErro(erro.response.data)
            })
        },
    });

    return (
        <div className="pb-4">
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group ">
                    <StyledTextField
                        className="form-control"
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        
                    />
                    {formik.errors.email && formik.touched.email  ? mensagemAlert(formik.errors.email) : null}
                </div>
                <div className="form-group">
                    <StyledTextField
                        className="form-control mt-2"
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                  
                    />
                    {formik.errors.password && formik.touched.password  ? mensagemAlert(formik.errors.password) : null}
                    
                </div>

                <div className="d-flex justify-content-between mt-2 mb-2 align-self-center">
                  
                    <DropdownItem goToMenu='recuperaremail'>
                        Esqueceu a senha?
                    </DropdownItem>
                    <button type="submit" className="btn btn-primary " name="itensLogin">Entrar</button>
                </div>

            </form>
        </div>
    )
}

export default () => (
  <AuthConsumer>
    {(context) => (
      <Login isUsuarioAutenticado={context.isAutenticado} Logar={context.iniciarSessao}/>
    )}
  </AuthConsumer>
)

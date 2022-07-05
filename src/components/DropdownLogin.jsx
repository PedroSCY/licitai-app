import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import UsuarioService from '../service/usuarioService'
import { mensagemErro, mensagemAlert, mensagemSucesso } from "./toastr";
import { AuthConsumer } from "../main/provedorAutenticacao";

// "import './index.css';

import { CSSTransition } from 'react-transition-group';

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



function DropdownLogin(props) {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item align-self-center" name="itemDropdown" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        {props.children}
      </a>
    );
  }

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
          props.logar(response.data)
          mensagemSucesso(`Login Completo.`)
        }).catch( erro => {
          mensagemErro(erro.response.data)
        })
    },
});

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={350}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
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
                {formik.errors.email && formik.touched.email ? mensagemAlert(formik.errors.email) : null}
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
                {formik.errors.password && formik.touched.password ? mensagemAlert(formik.errors.password) : null}

              </div>

              <div className="d-flex justify-content-between mt-2 mb-2 align-self-center">
                <DropdownItem goToMenu='recuperaremail'>
                  Esqueceu a senha?
                </DropdownItem>
                <button type="submit" className="btn btn-primary " name="itensLogin">Entrar</button>
              </div>

            </form>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'recuperaremail'}
        timeout={350}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">

          <div className="pb-4">
            <form >
              <div className="form-group justify-content-start">
                <label className='d-flex text-start mb-2'>Insira o e-mail para recuperação de senha</label>
                <input type="email" className="form-control" id="textfieldEmailLogin" placeholder="Digite o seu Email" />
              </div>

              <div className="d-flex justify-content-between mt-2 mb-2">
                <DropdownItem goToMenu="main">
                  <button type="submit" className="btn btn-light " name="itemDropdown">voltar</button>
                </DropdownItem>
                <DropdownItem goToMenu="msgconfirmacao">
                  <button type="submit" className="btn btn-primary " name="itemDropdown">Recuperar</button>
                </DropdownItem>
              </div>
            </form>
          </div>
        </div>

      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'msgconfirmacao'}
        timeout={350}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">

          <div className="pb-4">
            <div className="d-flex justify-content-between mt-2 mb-2">
              <p>Teste</p>
            </div>
          </div>
        </div>
      </CSSTransition>


    </div>
  );
}

export default () => (
  <AuthConsumer>
    {(context) => (
      <DropdownLogin isUsuarioAutenticado={context.isAutenticado} logar={context.iniciarSessao} />
    )}
  </AuthConsumer>
)
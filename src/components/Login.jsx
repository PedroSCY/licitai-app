import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import axios from 'axios'

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
      .required('Obrigatorio'),
    password: yup
      .string('Coloque sua senha')
      .min(4, 'Sua senha deve conter no mininimo 4 caracteres')
      .required('Obrigatorio'),
  });

function Login(props) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios
            .post('http://localhost:8080/api/usuarios/autenticar',{
              email: values.email,
              senha: values.password
            }).then( response => {
              console.log(response)
            }).catch( erro => {
              alert(erro.response.data)
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
                        helperText={formik.touched.email && formik.errors.email}
                    />
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
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    
                </div>

                <div className="d-flex justify-content-between mt-2 mb-2 align-self-center">
                    <props.DropdownItem goToMenu='recuperaremail'>
                        <a href="#"  >Esqueceu a senha?</a>
                    </props.DropdownItem>
                    <button type="submit" className="btn btn-primary ">Entrar</button>
                </div>

            </form>
        </div>
    )
}

export default Login

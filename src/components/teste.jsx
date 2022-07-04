import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'

class Teste extends React.Component{

  state = {
    email: '',
    senha: ''
  }

  constructor(){
    super();

  }

  render(){
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

export default Teste




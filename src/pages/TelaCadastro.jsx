import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { AuthConsumer } from "../main/provedorAutenticacao";
import UsuarioService from '../service/usuarioService'
import { mensagemErro, mensagemAlert, mensagemSucesso } from "../components/toastr";
import { useHistory } from "react-router-dom";


const service = new UsuarioService();


const StyledTextField = withStyles({
    root: {
        '& > *': {

            width: '30ch',
        },
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
    emailCadastro: yup
        .string('Coloque seu email')
        .email('Digite um email Valido')
        .required('Campo Obrigatorio'),
    senhaCadastro: yup
        .string('Coloque sua senha')
        .min(4, 'Sua senha deve conter no mininimo 4 caracteres')
        .required('Campo Obrigatorio'),
    confirmSenhaCadastro: yup
        .string('Confirme sua senha')
        .min(4, 'Sua senha deve conter no mininimo 4 caracteres')
        .oneOf([yup.ref('senhaCadastro'), null], "Senhas não batem.")
        .required('Campo Obrigatorio'),
    nomeCadastro: yup
        .string('Coloque a razão social *nome*')
        .required('Campo Obrigatorio'),
    telefoneCadastro: yup
        .number('Coloque seu Telefone')
        .min(8, 'Numero deve conter 9 digitos')
        .required('Campo Obrigatorio'),
    cnpjCadastro: yup
        .number('Coloque seu Telefone')
        .min(13, 'telefone deve conter 14 digitos')
        .required('Campo Obrigatorio'),
});

function TelaCadastro(props) {

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            emailCadastro: '',
            senhaCadastro: '',
            confirmSenhaCadastro: '',
            nomeCadastro: '',
            telefoneCadastro: '',
            cnpjCadastro: '',

        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            service.cadastrar({
                nome: values.nomeCadastro,
                cnpj: values.cnpjCadastro,
                telefone: values.telefoneCadastro,
                contaAcesso: {
                    email: values.emailCadastro,
                    senha: values.senhaCadastro,
                    admin: false
                }
            }).then(response => {
                mensagemSucesso(`Usuario cadastrado com sucesso.`)
                service.autenticar({
                    email: values.emailCadastro,
                    senha: values.senhaCadastro
                }).then(response => {
                    props.Logar(response.data)
                    history.push("/")

                }).catch(erro => {
                    mensagemErro(erro.response.data)
                })

            }).catch(erro => {
                mensagemErro(erro.response.data)
            })
        },
    });

    return (
        <div className="CardCadastro">


            <div className="CardDivisor"></div>
            <div className="CardCorSecundaria"></div>
            <div className="CardFormularioCadastro">
                <form onSubmit={formik.handleSubmit} className="FormularioCadastro">
                    <div className="d-flex flex-wrap justify-content-evenly mt-4">
                        <div className="">
                            <div className="form-group ">
                                <StyledTextField
                                    className="form-control"
                                    id="emailCadastro"
                                    name="emailCadastro"
                                    label="Email"
                                    value={formik.values.emailCadastro}
                                    onChange={formik.handleChange}
                                    error={formik.touched.emailCadastro && Boolean(formik.errors.emailCadastro)}

                                />
                                {formik.errors.emailCadastro && formik.touched.emailCadastro ? mensagemAlert(formik.errors.emailCadastro) : null}
                            </div>
                            <div className="form-group">
                                <StyledTextField
                                    className="form-control mt-2"
                                    id="senhaCadastro"
                                    name="senhaCadastro"
                                    label="Senha"
                                    type="password"
                                    value={formik.values.senhaCadastro}
                                    onChange={formik.handleChange}
                                    error={formik.touched.senhaCadastro && Boolean(formik.errors.senhaCadastro)}

                                />
                                {formik.errors.senhaCadastro && formik.touched.senhaCadastro ? mensagemAlert(formik.errors.senhaCadastro) : null}

                            </div>

                            <div className="form-group">
                                <StyledTextField
                                    className="form-control mt-2"
                                    id="confirmSenhaCadastro"
                                    name="confirmSenhaCadastro"
                                    label="Confirmar senha"
                                    type="password"
                                    value={formik.values.confirmSenhaCadastro}
                                    onChange={formik.handleChange}
                                    error={formik.touched.confirmSenhaCadastro && Boolean(formik.errors.confirmSenhaCadastro)}

                                />
                                {formik.errors.confirmSenhaCadastro && formik.touched.confirmSenhaCadastro ? mensagemAlert(formik.errors.confirmSenhaCadastro) : null}

                            </div>
                        </div>

                        <div className="">
                            <div className="form-group ">
                                <StyledTextField
                                    className="form-control"
                                    id="nomeCadastro"
                                    name="nomeCadastro"
                                    label="Nome"
                                    value={formik.values.nomeCadastro}
                                    onChange={formik.handleChange}
                                    error={formik.touched.nomeCadastro && Boolean(formik.errors.nomeCadastro)}

                                />
                                {formik.errors.nomeCadastro && formik.touched.nomeCadastro ? mensagemAlert(formik.errors.nomeCadastro) : null}
                            </div>

                            <div className="form-group">
                                <StyledTextField
                                    className="form-control mt-2"
                                    id="cnpjCadastro"
                                    name="cnpjCadastro"
                                    label="CNPJ"
                                    value={formik.values.cnpjCadastro}
                                    onChange={formik.handleChange}
                                    error={formik.touched.cnpjCadastro && Boolean(formik.errors.cnpjCadastro)}

                                />
                                {formik.errors.cnpjCadastro && formik.touched.cnpjCadastro ? mensagemAlert(formik.errors.cnpjCadastro) : null}

                            </div>

                            <div className="form-group">
                                <StyledTextField
                                    className="form-control mt-2"
                                    id="telefoneCadastro"
                                    name="telefoneCadastro"
                                    label="Telefone"
                                    value={formik.values.telefoneCadastro}
                                    onChange={formik.handleChange}
                                    error={formik.touched.telefoneCadastro && Boolean(formik.errors.telefoneCadastro)}

                                />
                                {formik.errors.telefoneCadastro && formik.touched.telefoneCadastro ? mensagemAlert(formik.errors.telefoneCadastro) : null}

                            </div>
                        </div>
                    </div>

                <div className="d-grid gap-2 mt-auto">
                    <button type="submit" className="btn btn-primary m-2 ">Cadastrar</button>
                </div>
                </form>

            </div>




        </div>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <TelaCadastro Logar={context.iniciarSessao} />
        )}
    </AuthConsumer>
)
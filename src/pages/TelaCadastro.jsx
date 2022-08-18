import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { AuthConsumer } from "../main/provedorAutenticacao";
import UsuarioService from '../service/usuarioService'
import { mensagemErro, mensagemAlert, mensagemSucesso } from "../components/toastr";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInfoDropdown, getAtividadesPorSegmento } from "../service/cnaeService";
import MenuItem from '@material-ui/core/MenuItem';

const service = new UsuarioService();

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: "34ch",
        minWidth: 120,
        border: 0,
        margin: 0,
        padding: 0,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const StyledTextField = withStyles({
    root: {
        '& > *': {

            width: '35ch',
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
    LogradouroCadastro: yup
        .string('Coloque seu Logradouro')
        .required('Campo Obrigatorio'),
    NumeroCadastro: yup
        .string('Coloque o numero do seu endereço')
        .required('Campo Obrigatorio'),
    BairroCadastro: yup
        .string('Coloque o Beirro')
        .required('Campo Obrigatorio'),
    CEPCadastro: yup
        .number("Coloque o CEP")
        .min(7, 'CEP deve conter 8 digitos')
        .required('Campo Obrigatorio'),
    SegmentoCadastro: yup
        .string('Selecione um Segmento')
        .required('Selecione um Segmento'),
    AtividadeCadastro: yup
        .string('Selecione uma Atividade')
        .required('Selecione uma Atividade'),
});

function TelaCadastro(props) {

    const history = useHistory();
    const classes = useStyles();


    const [cnae, setCnae] = useState([]);
    const [atividades, setAtividades] = useState([]);


    useEffect(() => {
        setCnae(getInfoDropdown());
    }, []);

    const handleChange = (event) => {
        setAtividades(getAtividadesPorSegmento(event.target.value));
    };

    const buscarNomeAtividade = (codigoAtividade) => {
        for(const element of atividades){
            console.log(codigoAtividade + " ?= " + element[0])
            if (codigoAtividade === element[0]) {
                console.log("True")
                return element[1]
            }
        }
        return "codigo invalido"
        
    }


    const formik = useFormik({

        initialValues: {
            emailCadastro: '',
            senhaCadastro: '',
            confirmSenhaCadastro: '',
            nomeCadastro: '',
            telefoneCadastro: '',
            cnpjCadastro: '',
            LogradouroCadastro: '',
            NumeroCadastro: '',
            BairroCadastro: '',
            CEPCadastro: '',
            ComplementoCadastro: '',
            SegmentoCadastro: '',
            AtividadeCadastro: '',
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
                },
                atividade: {
                    codigoAtividade: values.AtividadeCadastro,
                    siglaSegmento: values.SegmentoCadastro,
                    nomeAtividade: buscarNomeAtividade(values.AtividadeCadastro)
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

                        <div >

                            <div>
                                <p className="pt-2">Dados da Conta</p>
                            </div>

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

                        <div >
                            <div >
                                <p className="pt-2">Dados da Empresa</p>
                            </div>

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

                    <div className="d-flex flex-wrap justify-content-evenly mt-4">
                        <div>

                            <div >
                                <p className="pt-3">Endereço</p>
                            </div>

                            <div className="form-group">
                                <StyledTextField
                                    className="form-control mt-2"
                                    id="LogradouroCadastro"
                                    name="LogradouroCadastro"
                                    label="Logradouro"
                                    value={formik.values.LogradouroCadastro}
                                    onChange={formik.handleChange}
                                    error={formik.touched.LogradouroCadastro && Boolean(formik.errors.LogradouroCadastro)}

                                />
                                {formik.errors.LogradouroCadastro && formik.touched.LogradouroCadastro ? mensagemAlert(formik.errors.LogradouroCadastro) : null}

                            </div>

                            <div className="form-group">
                                <StyledTextField
                                    className="form-control mt-2"
                                    id="NumeroCadastro"
                                    name="NumeroCadastro"
                                    label="Numero"
                                    value={formik.values.NumeroCadastro}
                                    onChange={formik.handleChange}
                                    error={formik.touched.NumeroCadastro && Boolean(formik.errors.NumeroCadastro)}

                                />
                                {formik.errors.NumeroCadastro && formik.touched.NumeroCadastro ? mensagemAlert(formik.errors.NumeroCadastro) : null}

                            </div>

                            <div className="form-group">
                                <StyledTextField
                                    className="form-control mt-2"
                                    id="BairroCadastro"
                                    name="BairroCadastro"
                                    label="Bairro"
                                    value={formik.values.BairroCadastro}
                                    onChange={formik.handleChange}
                                    error={formik.touched.BairroCadastro && Boolean(formik.errors.BairroCadastro)}

                                />
                                {formik.errors.BairroCadastro && formik.touched.BairroCadastro ? mensagemAlert(formik.errors.BairroCadastro) : null}

                            </div>

                            <div className="form-group">
                                <StyledTextField
                                    className="form-control mt-2"
                                    id="CEPCadastro"
                                    name="CEPCadastro"
                                    label="CEP"
                                    value={formik.values.CEPCadastro}
                                    onChange={formik.handleChange}
                                    error={formik.touched.CEPCadastro && Boolean(formik.errors.CEPCadastro)}

                                />
                                {formik.errors.CEPCadastro && formik.touched.CEPCadastro ? mensagemAlert(formik.errors.CEPCadastro) : null}

                            </div>

                            <div className="form-group">
                                <StyledTextField
                                    className="form-control mt-2"
                                    id="ComplementoCadastro"
                                    name="ComplementoCadastro"
                                    label="Complemento"
                                    value={formik.values.ComplementoCadastro}
                                    onChange={formik.handleChange}
                                    error={formik.touched.ComplementoCadastro && Boolean(formik.errors.ComplementoCadastro)}

                                />
                                {formik.errors.ComplementoCadastro && formik.touched.ComplementoCadastro ? mensagemAlert(formik.errors.ComplementoCadastro) : null}

                            </div>


                        </div>
                        <div className="">

                            <div >
                                <p className="pt-3">Atuação</p>
                            </div>

                            <div className="form-group pt-2">
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="SegmentoCadastro">Segmento</InputLabel>
                                    <Select
                                        labelId="SegmentoCadastro"
                                        id="SegmentoCadastro"
                                        name="SegmentoCadastro"
                                        value={formik.values.SegmentoCadastro}
                                        onChange={mudar => {
                                            formik.handleChange(mudar);
                                            handleChange(mudar);
                                        }}
                                        autoWidth
                                        error={formik.touched.SegmentoCadastro && Boolean(formik.errors.SegmentoCadastro)}

                                    >

                                        {cnae.map((segmento) => {
                                            const id = segmento[0]
                                            const text = segmento[1]
                                            return (<MenuItem id={id} value={id}>{text}</MenuItem>)
                                        })}
                                    </Select>
                                    {formik.errors.SegmentoCadastro && formik.touched.SegmentoCadastro ? mensagemAlert(formik.errors.SegmentoCadastro) : null}

                                </FormControl>

                               
                            </div>

                            <div className="form-group pt-3">
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="AtividadeCadastro">Atividades</InputLabel>
                                    <Select
                                        labelId="AtividadeCadastro"
                                        id="AtividadeCadastro"
                                        name="AtividadeCadastro"
                                        value={formik.values.AtividadeCadastro}
                                        onChange={formik.handleChange}
                                        disabled={formik.values.SegmentoCadastro === "" ? true : false}
                                        error={formik.touched.AtividadeCadastro && Boolean(formik.errors.AtividadeCadastro)}
                                    >
                                        
                                        {atividades.map((atividade) => {
                                            const id = atividade[0]
                                            const text = atividade[1]
                                            return (<MenuItem id={id} value={id}>{text}</MenuItem>)
                                        })}
                                    </Select>
                                    {formik.errors.AtividadeCadastro && formik.touched.AtividadeCadastro ? mensagemAlert(formik.errors.AtividadeCadastro) : null}

                                </FormControl>
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
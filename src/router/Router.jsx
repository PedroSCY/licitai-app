import React from "react";

import Home from "../pages/home"
import NotFoud from "../pages/NotFoud"
import NavBar from "../components/Navbar";
import { mensagemAlert } from "../components/toastr";
import { Route, Switch, BrowserRouter, Redirect, HashRouter } from 'react-router-dom'
import { AuthConsumer } from "../main/provedorAutenticacao";
import TelaCadastro from "../pages/TelaCadastro";

function RotaAutenticada( { component: Component, isAutenticado, ...props } ){
    return (
        <Route {...props} render={ (componentProps) => {
            if(isAutenticado){
                return (
                    <Component {...componentProps} />
                )
            }else{
                return(
                    <Redirect to={ {pathname : '/', state : { from: componentProps.location } } }>{mensagemAlert("Faça Login para acessar.")}</Redirect>
                )
            }
        }}  />
    )
}

function Router(props) {

    return (
        <HashRouter>

            <Switch>

                <Route exact path="/">
                    <Home />
                </Route>

                <Route exact path="/cadastro">
                    <TelaCadastro />
                </Route>

                <RotaAutenticada path="/materiais" isAutenticado={props.isAutenticado} component={NotFoud}>
                </RotaAutenticada>
                
                <RotaAutenticada path="/licitações" isAutenticado={props.isAutenticado} component={NotFoud}>
                </RotaAutenticada>

                <Route path={"*"}>
                    <NotFoud />
                </Route>

            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (<Router isAutenticado={context.isAutenticado} />)}
    </AuthConsumer>
)
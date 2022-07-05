import React from "react";

import Home from "../pages/home"
import NotFoud from "../pages/NotFoud"
import NavBar from "../components/Navbar";
import { mensagemAlert } from "../components/toastr";
import AuthService from "../service/authService";
import { Route, Switch, BrowserRouter, Redirect, HashRouter } from 'react-router-dom'

function RotaAutenticada( { component: Component, ...props } ){
    return (
        <Route {...props} render={ (componentProps) => {
            console.log(AuthService.isUsuarioAutenticado())
            if(AuthService.isUsuarioAutenticado()){
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

function Router() {

    return (
        <HashRouter>

            <Switch>

                <Route exact path="/">
                    <NavBar />
                    <Home />
                </Route>

    
                <RotaAutenticada path="/materiais" component={NotFoud}>
                </RotaAutenticada>
                
                <RotaAutenticada path="/licitações" component={NotFoud}>
                </RotaAutenticada>

                <Route path={"*"}>
                    <NotFoud />
                </Route>

            </Switch>
        </HashRouter>
    )
}

export default Router
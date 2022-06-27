import React from "react";

import Home from "../pages/home"
import NotFoud from "../pages/NotFoud"

import { BrowserRouter, Switch, Route, HashRouter } from 'react-router-dom'

function Router() {

    return (
        <HashRouter>

            <Switch>

                <Route exact path="/">
                    <Home />
                </Route>

                {/* <PrivateRoute exact path="/Home" component={Home}></PrivateRoute> */}


                <Route path="*">
                    <NotFoud />
                </Route>

            </Switch>
        </HashRouter>
    )
}

export default Router
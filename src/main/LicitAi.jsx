import React from "react";

import Navbar from "../components/Navbar";
import Router from "../router/Router"
import ProvedorAutenticacao from "./provedorAutenticacao";


import { createTheme, ThemeProvider } from "@material-ui/core";
import 'bootswatch/dist/flatly/bootstrap.css'
import 'toastr/build/toastr.css'
import '../css/LicitAi.css'

const theme = createTheme({
    palette: {
        primary: {
            main: '#14887c'
        },
    }
})


class App extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className="Licitai">
                    <ProvedorAutenticacao>
                        <Navbar />
                        <div className="DisplayPages">
                            <Router />
                        </div>
                    </ProvedorAutenticacao>
                </div>
            </ThemeProvider>
        )
    }
}
export default App

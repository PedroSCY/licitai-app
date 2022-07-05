import React from "react";

import Navbar from "../components/Navbar";
import Router from "../router/Router"
import ProvedorAutenticacao from "./provedorAutenticacao";



import 'bootswatch/dist/flatly/bootstrap.css'
import 'toastr/build/toastr.css'
import '../css/LicitAi.css'

class App extends React.Component {
    render() {
        return (
            <ProvedorAutenticacao>
                <Navbar />
                <div>
                    <Router />
                </div>
            </ProvedorAutenticacao>
        )
    }
}
export default App

import React from "react";

import Navbar from "../components/Navbar";
import Router from  "../router/Router"



import 'bootswatch/dist/flatly/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/LicitAi.css'

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar></Navbar> 
                <Router></Router>
            </div>
        )
    }
}

export default App

import React from "react";
import DropdownMenu from "./DropdownMenu";
import NavItem from "./NavItem";


class NavBar extends React.Component {
    render() {
        return (
            <nav className=" d-flex flex-wrap align-items-center justify-content-around py-2 mb-4 border-bottom" style={{ background: "#044b4d" }}>

                <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-white text-decoration-none">
                    <h3>LICITAÍ</h3>
                </a>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                        <a href="#" className="nav-link fs-5 px-3">LICITAÇÕES</a>
                    </li>

                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                        <a href="#" className="nav-link fs-5 px-3 ">MATERIAIS</a>
                    </li>

                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                        <a href="#" className="nav-link fs-5 px-3 ">SOBRE</a>
                    </li>
                </ul>

                <div className="d-flex col-md-3 text-end justify-content-end">
                    <NavItem config="btn btn-light me-3" titulo="Login">
                        <DropdownMenu></DropdownMenu>
                    </NavItem>

                    <button type="button" className="btn btn-primary ">Cadastre-se</button>
                </div>

            </nav>

        )
    }
}

export default NavBar
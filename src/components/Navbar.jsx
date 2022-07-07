import React from "react";
import DropdownLogin from "./DropdownLogin";
import NavbarItem from "./NavbarItem";
import NavItemDropdown from "./NavItemDropdown";
import { mensagemSucesso } from "./toastr";
import { AuthConsumer } from "../main/provedorAutenticacao";


function NavBar(props) {

    const logout = () => {
        props.deslogar()
        mensagemSucesso("Logout Completo.")
    }

    const authBotoesNavbar = () => {
        if (!props.isAutenticado) {
            return (
                <>
                    <NavItemDropdown config="btn btn-light me-3" titulo="Login">
                        <DropdownLogin></DropdownLogin>
                    </NavItemDropdown>

                    <NavbarItem 
                     render={true}
                     navIntemLinkType = {false}>
                        <a href="#/cadastro"><button type="button" className="btn btn-primary ">Cadastre-se</button></a>
                        
                    </NavbarItem>
                </>
            )
        } else {
            return (
                <>
                    <label className="align-items-center me-3 text-white text-decoration-none align-self-center">{props.usuarioAutenticado.nome}</label>

                    <button type="button" className="btn btn-light " onClick={logout}>Sair</button>
                </>
            )
        }
    }

    return (
        
        <nav className=" d-flex flex-wrap align-items-center justify-content-around py-2 mb-4 border-bottom" style={{ background: "#044b4d" }}>

            <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-white text-decoration-none ">
                <h3>LICITAÍ</h3>
            </a>

            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <NavbarItem
                    render={true}
                    navIntemLinkType = {true}
                    href="#/licitações"
                    label="LICITAÇÕES"
                    configsli="nav-item pl-4 pl-md-0 ml-0 ml-md-4"
                    configsa="nav-link fs-5 px-3"></NavbarItem>

                <NavbarItem
                    render={true}
                    navIntemLinkType = {true}
                    href="#/materiais"
                    label="MATERIAL"
                    configsli="nav-item pl-4 pl-md-0 ml-0 ml-md-4"
                    configsa="nav-link fs-5 px-3"></NavbarItem>

                <NavbarItem
                    render={true}
                    navIntemLinkType = {true}
                    href="#/sobre"
                    label="SOBRE"
                    configsli="nav-item pl-4 pl-md-0 ml-0 ml-md-4"
                    configsa="nav-link fs-5 px-3"></NavbarItem>
            </ul>

            <div className="d-flex col-md-3 text-end justify-content-end">
                <NavbarItem  
                render={true} 
                navIntemLinkType = {false}>          
                    {authBotoesNavbar()}
                </NavbarItem>
            </div>

        </nav>

    )
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <NavBar isAutenticado={context.isAutenticado}  usuarioAutenticado={context.usuarioAutenticado} deslogar={context.encerrarSessao} />
        )}
    </AuthConsumer>
)
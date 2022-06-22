import React from "react";

import { Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import Login from "./Login";
import NavItem from "./NavItem";

class Teste extends React.Component {
    render() {
        return (
            <nav className="d-flex flex-wrap col-md-3 text-end row justify-content-end">
                <div>
                    {/* <Dropdown autoClose="outside">
                        <Dropdown.Toggle id="dropdown-autoclose-outside">
                            login
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <form className="p-4">
                                <div className="form-group">
                                    <label for="exampleDropdownFormEmail2">Endereço de email</label>
                                    <input type="email" className="form-control" id="exampleDropdownFormEmail2" placeholder="email@exemplo.com"/>
                                </div>
                                <div className="form-group">
                                    <label for="exampleDropdownFormPassword2">Senha</label>
                                    <input type="password" className="form-control" id="exampleDropdownFormPassword2" placeholder="Senha"/>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="dropdownCheck2"/>
                                        <label className="form-check-label" for="dropdownCheck2">
                                            Lembrar de mim
                                        </label>
                                </div>
                                <button type="submit" className="btn btn-primary">Entrar</button>
                            </form>
                        </Dropdown.Menu>
                    </Dropdown>
                    <DropdownButton
                        as={ButtonGroup}
                        align={{ lg: 'end' }}
                        title="Login"
                        id="dropdown-menu-align-responsive-1"
                    >
                        <Dropdown.Item eventKey="1">Action 1</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Action 2</Dropdown.Item>
                    </DropdownButton> */}

                    {/* <NavItem config="btn btn-light mr-3" titulo="Login">
                    <form className="p-4">
                                <div className="form-group">
                                    <label for="exampleDropdownFormEmail2">Endereço de email</label>
                                    <input type="email" className="form-control" id="exampleDropdownFormEmail2" placeholder="email@exemplo.com"/>
                                </div>
                                <div className="form-group">
                                    <label for="exampleDropdownFormPassword2">Senha</label>
                                    <input type="password" className="form-control" id="exampleDropdownFormPassword2" placeholder="Senha"/>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="dropdownCheck2"/>
                                        <label className="form-check-label" for="dropdownCheck2">
                                            Lembrar de mim
                                        </label>
                                </div>
                                <button type="submit" className="btn btn-primary">Entrar</button>
                            </form>
                    </NavItem> */}

                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                        <a href="#" className="nav-link fs-4 px-3 ">SOBRE</a>
                    </li>

                </div>

            </nav>
        )
    }
}

export default Teste
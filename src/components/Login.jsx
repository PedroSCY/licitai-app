import React from "react";


function Login(props) {  



    
        return (
            <div className="pb-4">
                <form >
                    <div className="form-group ">
                        <input type="email" className="form-control" id="textfieldEmailLogin" placeholder="Digite o seu Email" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control mt-2" id="textfieldSenhaLogin" placeholder="Digite a sua senha" />
                    </div>

                    <div className="d-flex justify-content-between mt-2 mb-2">
                        <props.DropdownItem goToMenu='recuperaremail'>
                            <a href="#" className="align-self-center" >Esqueceu a senha?</a>
                        </props.DropdownItem>
                        <button type="submit" className="btn btn-primary " >Entrar</button>
                    </div>

                </form>
            </div>
        )   
}

export default Login

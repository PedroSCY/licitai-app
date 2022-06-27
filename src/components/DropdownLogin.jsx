import React, { useState, useEffect, useRef } from 'react';

// "import './index.css';

import { CSSTransition } from 'react-transition-group';
import Login from './Login';

function DropdownLogin() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item align-self-center" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        {props.children}
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={350}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
            <Login DropdownItem={DropdownItem}></Login>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'recuperaremail'}
        timeout={350}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">

          <div className="pb-4">
            <form >
              <div className="form-group justify-content-start">
                <label className='d-flex text-start mb-2'>Insira o e-mail para recuperação de senha</label>
                <input type="email" className="form-control" id="textfieldEmailLogin" placeholder="Digite o seu Email" />
              </div>

              <div className="d-flex justify-content-between mt-2 mb-2">
                <DropdownItem goToMenu="main">
                  <button type="submit" className="btn btn-light ">voltar</button>
                </DropdownItem>
                <DropdownItem goToMenu="msgconfirmacao">
                  <button type="submit" className="btn btn-primary ">Recuperar</button>
                </DropdownItem>
              </div>
            </form>
          </div>
        </div>
        
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'msgconfirmacao'}
        timeout={350}
        classNames="menu-secondary"
        unmountOnExit = "true"
        onEnter={calcHeight}>
        <div className="menu">

          <div className="pb-4">
              <div className="d-flex justify-content-between mt-2 mb-2">
                <p>Teste</p>
              </div>
          </div>
        </div>
      </CSSTransition>


    </div>
  );
}

export default DropdownLogin
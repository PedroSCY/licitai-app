import React, { useState, useEffect, useRef } from 'react';

// "import './index.css';

import { CSSTransition } from 'react-transition-group';
import Login from './Login';

function DropdownMenu(props) {
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
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
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
              <div className="form-group ">
                <input type="email" className="form-control" id="textfieldEmailLogin" placeholder="Digite o seu Email" />
              </div>
             
              <div className="d-flex justify-content-between mt-2 mb-2">
                <button type="submit" className="btn btn-primary ">Recuperar</button>
              </div>

            </form>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default DropdownMenu
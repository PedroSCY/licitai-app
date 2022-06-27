import React, { useState, useEffect, useRef } from 'react';

function NavItemDropdown(props) {
    const [open, setOpen] = useState(false);
  
    return (
      <li className="nav-item-drop">
        <button type="button" className={props.config} onClick={() => setOpen(!open)}>
            {props.titulo}
        </button>
        {open && props.children}
      </li>
    );
  }

export default NavItemDropdown
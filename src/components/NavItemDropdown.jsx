import React, { useState, useEffect, useRef} from 'react';

function NavItemDropdown(props) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
      document.addEventListener("click", handleOutsideClick);
    }, [dropdownRef]);

    const handleOutsideClick = (event) => {
     
      if (dropdownRef.current && !(dropdownRef.current.contains(event.target) || (event.target.name === "itemDropdown"))) {
        setOpen(false);
      }
    }

 
    return (
      <li className="nav-item-drop" ref={dropdownRef}>
        <button type="button" className={props.config}  onClick={() => setOpen(!open)}>
            {props.titulo}
        </button>
        {open && props.children} 
      </li>
    );
  }

export default NavItemDropdown
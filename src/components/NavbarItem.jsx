import React from 'react'

function NavbarItem( {render, ...props} ){
    if(render){
        return (
            <li className={props.configsli}>
                <a onClick={props.onClick} className={props.configsa} href={props.href}>{props.label}</a>
            </li>
        )
    }else{
        return false;
    }
}

export default NavbarItem
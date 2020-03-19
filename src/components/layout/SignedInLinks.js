import React, { useContext } from 'react'
import { NavLink } from "react-router-dom"
import { SidenavContext } from '../../contexts/SidenavContext'

function SignedInLinks() {
    const { changeIsOpen } = useContext(SidenavContext)
    return (
        <ul className="right">
            <li className="hide-on-med-and-down"> <NavLink to="/"> What todo? </NavLink> </li>
            <li className="hide-on-med-and-down"> <NavLink to="/"> Log Out </NavLink> </li>
            <li> <NavLink to="/" className="btn btn-floating pink lighten-2" onClick={() => {changeIsOpen(true)}}> BP </NavLink> </li>
        </ul>
    )
}

export default SignedInLinks

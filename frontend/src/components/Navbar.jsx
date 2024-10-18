import React from 'react'
import {assets} from '../assets/assets'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
    return (
        <div>
            <img src={assets.logo} alt="" />
            <ul>
                <NavLink>
                    <li>HOME</li>
                    <hr />
                </NavLink>
                <NavLink>
                    <li>All DOCTORS</li>
                    <hr />
                </NavLink>
                <NavLink>
                    <li>ABOUT</li>
                    <hr />
                </NavLink>
                <NavLink>
                    <li>CONTACT</li>
                    <hr />
                </NavLink>
            </ul>
            <div>
                <button>Create account</button>
            </div>
        </div>
    )
}

export default Navbar
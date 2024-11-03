import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { token, setToken, userData } = useContext(AppContext)
    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }
    return (
        <div className='flex items-center justify-between py-4 mb-5 text-sm border-b border-b-gray-400'>
            <img onClick={() => navigate('/')} className='cursor-pointer w-44' src={assets.logo} alt="" />
            <ul className='items-start hidden gap-5 font-medium md:flex '>
                <NavLink to='/'>
                    <li className='py-1'>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1'>All DOCTORS</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1'>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1'>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
            </ul>
            <div className='flex gap-4 item-center'>
                {
                    token && userData
                        ? <div className='relative flex items-center gap-2 cursor-pointer group'>
                            <img className='w-8 rounded-full' src={userData.image} alt="" />
                            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                            <div className='absolute top-0 right-0 hidden text-base font-medium text-gray-600 pt-14 group-hover:block'>
                                <div className='flex flex-col gap-4 p-4 rounded min-w-48 bg-stone-100'>
                                    <p onClick={() => navigate('my-profile')} className='cursor-pointer hover:text-black'>My Profile</p>
                                    <p onClick={() => navigate('my-appointments')} className='cursor-pointer hover:text-black'>My Appointments</p>
                                    <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                                </div>
                            </div>
                        </div>
                        : <button className='hidden px-8 py-3 font-light text-white rounded-full bg-primary md:block' onClick={() => { navigate('/login') }}>Create account</button>

                }
                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

                {/* ------ mobile menu ------- */}

                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 bottom-0 top-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-36' src={assets.logo} alt="" />
                        <img className='w-7' onClick={() => { setShowMenu(false) }} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 px-5 mt-5 text-lg font-medium'>
                        <NavLink onClick={() => { setShowMenu(false) }} to="/"><p className='inline-block px-4 py-2 rounded'>HOME</p></NavLink>
                        <NavLink onClick={() => { setShowMenu(false) }} to="/doctors"><p className='inline-block px-4 py-2 rounded'>All DOCTORS</p></NavLink>
                        <NavLink onClick={() => { setShowMenu(false) }} to="/about"><p className='inline-block px-4 py-2 rounded'>ABOUT</p></NavLink>
                        <NavLink onClick={() => { setShowMenu(false) }} to="/contact"><p className='inline-block px-4 py-2 rounded'>CONTACT</p></NavLink>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Navbar
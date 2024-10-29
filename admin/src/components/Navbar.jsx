import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext)
    const navigate = useNavigate()
    const logout = () => {
        // redirect to / page
        navigate('/')
        // if aToken is defined then set to ('')
        aToken && setAToken('')
        // aToken is available in storage then use removeItem in local Storage
        aToken && localStorage.removeItem('aToken')
    }
    return (
        <div className='flex items-center justify-between px-4 py-3 bg-white border-b sm:px-10'>
            <div className='flex items-center gap-2 text-xs'>
                <img className='cursor-pointer w-36 sm:w-40' src={assets.admin_logo} alt="" />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button className='px-10 py-2 text-white rounded-full bg-primary txt-sm' onClick={logout}>Logout</button>
        </div>
    )
}

export default Navbar
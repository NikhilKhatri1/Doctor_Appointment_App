import React, { useContext, useState } from 'react'
import axios from 'axios'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext.jsx'

const Login = () => {
    const [state, setState] = useState('Admin')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setAToken, backendUrl } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        
        event.preventDefault()

        try {
            if (state === 'Admin') {

                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
                if (data.success) {
                    console.log(data.token);
                }

            } else {

            }
        }
        catch (error) {

        }
    }



    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col items-start gap-3 p-8 m-auto min-w-[340px] sm:min-w-96 border rounded text-[#5E5E5E] text-sm shadow-lg'>
                <p className='m-auto text-2xl font-semibold'><span className='text-primary'> {state} </span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
                </div>
                <button className='w-full py-2 text-base text-white rounded-md bg-primary'>login</button>
                {
                    state === 'Admin'
                        ? <p>Doctor Login? <span className='underline cursor-pointer text-primary' onClick={() => setState('Doctor')}>Click here</span></p>
                        : <p>Admin Login? <span className='underline cursor-pointer text-primary' onClick={() => setState('Admin')}>Click here</span></p>
                }
            </div>

        </form>
    )
}

export default Login
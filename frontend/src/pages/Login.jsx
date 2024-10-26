import React, { useState } from 'react'

const Login = () => {
  const [state, setState] = useState('Sign Up');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')

  const onsubmitHandler = async (event) => {
    event.preventDefault()
  }
  return (
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col items-start gap-3 p-8 m-auto min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign Up' : 'log in'} to book appointment </p>
        {
          state === 'Sign Up'
          &&
          <div className='w-full'>
            <p>Full Name</p>
            <input className='w-full p-2 mt-1 border rounded border-zinc-300' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
          </div>
        }

        <div className='w-full'>
          <p>Email</p>
          <input className='w-full p-2 mt-1 border rounded border-zinc-300' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='w-full p-2 mt-1 border rounded border-zinc-300' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        </div>
        <button className='w-full py-2 text-base text-white rounded-md bg-primary'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
        {
          state === 'Sign Up'
            ? <p>Already have an Account? <span onClick={() => setState('Login')} className='underline cursor-pointer text-primary'>Login here</span></p>
            : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='underline cursor-pointer text-primary'>click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
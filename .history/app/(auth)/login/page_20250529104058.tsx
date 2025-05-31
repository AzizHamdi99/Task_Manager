import Link from 'next/link'
import React from 'react'

function login() {
  return (
    <div className='flex flex-col'>
      <h2 className='font-bold text-2xl text-black mb-44'>Task Manager</h2>
      <h2 className='font-bold text-2xl text-black'>Welcome Back </h2>
      <p className='text-gray-900 text-sm font-extralight '>Please enter your details to log in</p>
      <form className=" flex flex-col gap-2 mt-4" action="">
        <label className='font-meduim text-[15px] text-gray-900' htmlFor="">Email Address</label>
        <input className='p-2' type="email" placeholder='john@exemple.com' />

        <label className='font-meduim text-[15px] text-gray-900 mt-4' htmlFor="">Password</label>
        <input type="password" placeholder='Min 8 characters' />

        <Link href={'/'}><button type='submit'>Login</button></Link>
      </form>
      <p>Don't have an account <Link href={'/register'}>SingUp</Link></p>



    </div>
  )
}

export default login

import Link from 'next/link'
import React from 'react'

function login() {
  return (
    <div className='flex flex-col'>
      <h2 className='font-bold text-2xl text-black mb-44'>Task Manager</h2>
      <h2 className='font-bold text-2xl text-black'>Welcome Back </h2>
      <p>Please enter your details to log in</p>
      <form className=" flex flex-col gap-1" action="">
        <label htmlFor="">Email Address</label>
        <input type="email" placeholder='john@exemple.com' />

        <label htmlFor="">Password</label>
        <input type="password" placeholder='Min 8 characters' />

        <Link href={'/'}><button type='submit'>Login</button></Link>
      </form>
      <p>Don't have an account <Link href={'/register'}>SingUp</Link></p>



    </div>
  )
}

export default login

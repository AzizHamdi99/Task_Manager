"use client"
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

function login() {

  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className='flex flex-col'>
      <h2 className='font-bold text-2xl text-black mb-44'>Task Manager</h2>
      <h2 className='font-bold text-2xl text-black'>Welcome Back </h2>
      <p className='text-gray-900 text-sm font-extralight '>Please enter your details to log in</p>
      <form className=" flex flex-col gap-2 mt-4" action="">
        <label className='font-meduim text-[15px] text-gray-900' htmlFor="">Email Address</label>
        <input className='p-2 w-xl bg-slate-100 border outline-none border-gray-300 border-[1px] rounded-sm px-3' type="email" placeholder='john@exemple.com' />

        <label className='font-meduim text-[15px] text-gray-900 mt-4' htmlFor="">Password</label>
        <div className='w-xl p-2 flex items-center justify-between border px-3 border-gray-300 border-[1px] rounded-sm  bg-slate-100'>
          <input className=' w-xl border-none outline-none font-medium    ' type={!showPassword ? "password" : "text"} placeholder='Min 8 characters' />
          <div className='text-gray-400' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Eye size={20} /> : <EyeOff size={20} />} </div>
        </div>
        <Link className='w-xl bg-blue-600 text-white text-center py-2 uppercase my-2' href={'/'}><button type='submit'>Login</button></Link>
      </form>
      <p>Don't have an account <Link href={'/register'}>SingUp</Link></p>



    </div>
  )
}

export default login

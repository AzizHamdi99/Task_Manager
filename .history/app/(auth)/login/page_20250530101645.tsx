"use client"
import { useAuthStore } from '@/stores/useUser'
import { BookOpenCheck, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { HtmlHTMLAttributes, useState } from 'react'

function login() {
  const router = useRouter()

  const { login } = useAuthStore()
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(data)
      router.push('/dashboard')

    } catch (error: any) {


    }


  }

  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className='flex flex-col'>
      <div className='flex gap-1  '>
        <BookOpenCheck color="blue" size={40} />
        <p className='font-bold text-2xl text-black mb-44'>Task Manager</p>
      </div>
      <h2 className='font-bold text-2xl text-black'>Welcome Back </h2>
      <p className='text-gray-900 text-sm font-extralight mt-1 '>Please enter your details to log in</p>
      <form className=" flex flex-col gap-2 mt-5" action="">
        <label className='font-meduim text-[15px] text-gray-900 ' htmlFor="">Email Address</label>
        <input value={data.email} onChange={handelChange} name='email' className='p-2 w-xl bg-slate-100 border outline-none border-gray-300 border-[1px] rounded-sm px-3' type="email" placeholder='john@exemple.com' />

        <label className='font-meduim text-[15px] text-gray-900 mt-4' htmlFor="">Password</label>
        <div className='w-xl p-2 flex items-center justify-between border px-3 border-gray-300 border-[1px] rounded-sm  bg-slate-100'>
          <input value={data.password} name='password' onChange={handelChange} className=' w-xl border-none outline-none font-medium    ' type={!showPassword ? "password" : "text"} placeholder='Min 8 characters' />
          <div className='text-gray-400' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Eye size={20} /> : <EyeOff size={20} />} </div>
        </div>
        <Link className='w-xl bg-blue-600 text-white text-center py-3 my-3 rounded-md text-[15px] hover:text-blue-900 hover:bg-blue-200 transition-all ' href={'/'}><button className='uppercase cursor-pointer' type='submit'>Login</button></Link>
      </form>
      <p className='text-[15px] font-medium'>Don't have an account? <Link className='text-blue-500 underline' href={'/register'}>SignUp</Link></p>



    </div>
  )
}

export default login

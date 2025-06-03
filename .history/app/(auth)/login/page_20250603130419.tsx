"use client"
import { useAuthStore } from '@/stores/useUser'
import { BarChart4, BookOpenCheck, CalendarDays, CheckCircle2, Eye, EyeOff, ListChecks, Star, Trophy, Users2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { HtmlHTMLAttributes, useState } from 'react'
import Image from 'next/image'
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
      console.error(error)

    }


  }

  const [showPassword, setShowPassword] = useState(false)
  return (
    // left side
    <div className='flex items-center justify-between'>
      <div className='flex flex-col'>
        <div className='flex gap-1  '>
          <BookOpenCheck color="blue" size={40} />
          <p className='font-bold text-2xl text-black mb-44'>Task Manager</p>
        </div>
        <h2 className='font-bold text-2xl text-black'>Welcome Back </h2>
        <p className='text-gray-900 text-sm font-extralight mt-1 '>Please enter your details to log in</p>
        <form onSubmit={handelSubmit} className=" flex flex-col gap-2 mt-5" action="">
          <label className='font-meduim text-[15px] text-gray-900 ' htmlFor="">Email Address</label>
          <input value={data.email} onChange={handelChange} name='email' className='p-2 w-xl bg-slate-100 border outline-none border-gray-300 border-[1px] rounded-sm px-3' type="email" placeholder='john@exemple.com' />

          <label className='font-meduim text-[15px] text-gray-900 mt-4' htmlFor="">Password</label>
          <div className='w-xl p-2 flex items-center justify-between border px-3 border-gray-300 border-[1px] rounded-sm  bg-slate-100'>
            <input value={data.password} name='password' onChange={handelChange} className=' w-xl border-none outline-none font-medium    ' type={!showPassword ? "password" : "text"} placeholder='Min 8 characters' />
            <div className='text-gray-400' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Eye size={20} /> : <EyeOff size={20} />} </div>
          </div>
          <button
            className="bg-blue-600 text-white py-3 my-4 cursor-pointer rounded-md text-sm hover:text-blue-900 hover:bg-blue-200 transition-all uppercase w-xl"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className='text-[15px] font-medium'>Don't have an account? <Link className='text-blue-500 underline' href={'/register'}>SignUp</Link></p>





      </div>
      {/* Right side - Enhanced Design */}
      {/* Right side - Simple Design */}
      {/* Right side - Matching Left Side Theme */}
      {/* Right side - Blue theme with large icons */}
      <div className="hidden md:flex w-1/2 bg-blue-600 h-full flex-col items-center justify-center p-10 text-white">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto">
            <BookOpenCheck size={48} className="text-white" />
          </div>
          <h2 className="font-bold text-3xl mb-4">
            Welcome to Task Manager
          </h2>
          <p className="text-blue-100 text-lg">
            Your productivity companion for better task management
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <ListChecks size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium text-white">Organize Tasks</h3>
              <p className="text-blue-100 text-sm">Keep everything in order</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Users2 size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium text-white">Team Collaboration</h3>
              <p className="text-blue-100 text-sm">Work together seamlessly</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <BarChart4 size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium text-white">Track Progress</h3>
              <p className="text-blue-100 text-sm">Monitor your achievements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login

"use client"
import { useAuthStore } from '@/stores/useUser'
import { BarChart4, BookOpenCheck, CalendarDays, CheckCircle2, Eye, EyeOff, ListChecks, Users2 } from 'lucide-react'
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
    <div className='flex ite'>
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

        {/* right side */}



      </div>
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex-col items-center justify-center p-10 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Boost Your Productivity</h2>
          <p className="text-md text-white/80">
            Task Manager helps you organize, track, and collaborate better than ever.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 text-white text-sm">
          <div className="flex items-center gap-3">
            <ListChecks size={28} />
            <span>Organize Tasks</span>
          </div>
          <div className="flex items-center gap-3">
            <CalendarDays size={28} />
            <span>Manage Deadlines</span>
          </div>
          <div className="flex items-center gap-3">
            <BarChart4 size={28} />
            <span>Track Progress</span>
          </div>
          <div className="flex items-center gap-3">
            <Users2 size={28} />
            <span>Team Collaboration</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={28} />
            <span>Achieve Goals</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login

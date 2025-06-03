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





      </div>
      {/* Right side - Enhanced Design */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-slate-50 to-gray-100 flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-60"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-40"></div>

        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star size={16} />
            Trusted by 10,000+ teams
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Boost Your
            <span className="text-blue-600 block">Productivity</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            Transform the way you work with our powerful task management platform designed for modern teams.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-12 relative z-10">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <ListChecks size={24} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Organization</h3>
            <p className="text-sm text-gray-600">Organize tasks with intelligent categorization and priority systems.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Users2 size={24} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Team Collaboration</h3>
            <p className="text-sm text-gray-600">Work together seamlessly with real-time updates and communication.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart4 size={24} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Progress Tracking</h3>
            <p className="text-sm text-gray-600">Monitor your progress with detailed analytics and insights.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Trophy size={24} className="text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Achieve Goals</h3>
            <p className="text-sm text-gray-600">Set and reach your objectives with milestone tracking.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 relative z-10">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" />
            <span>Free 14-day trial</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" />
            <span>No credit card required</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login

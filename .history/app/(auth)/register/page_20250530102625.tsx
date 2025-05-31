"use client"
import React, { useState } from 'react'
import { BookOpenCheck, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
function register() {
    const [showPassword, setShowPassword] = useState(false)

    const [data, setData] = useState({
        fullname: "",
        email: "",

    })


    return (
        <div className='flex flex-col w-1/2'>
            <div className='flex gap-1  '>
                <BookOpenCheck color="blue" size={40} />
                <p className='font-bold text-2xl text-black mb-28'>Task Manager</p>
            </div>
            <h2 className='font-bold text-2xl text-black'>Create an account </h2>

            <p className='text-gray-900 text-sm font-extralight mt-1 '>Join us today by entrning your details below</p>
            <div className='flex items-center justify-center my-2'>
                <Image width={100} height={100} src={"/nppdp.webp"} alt='no pdp' className='rounded-full' />
            </div>
            <form className=" flex flex-col gap-2 mt-5" action="">
                <div className='grid grid-cols-2 items-center gap-3'>
                    <div className='flex gap-2 flex-col '>
                        <label className='font-meduim text-[15px] text-gray-900 ' htmlFor="">Full name </label>
                        <input className='p-2  bg-slate-100 border outline-none border-gray-300 border-[1px] rounded-sm px-3' type="text" placeholder='john' />
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <label className='font-meduim text-[15px] text-gray-900 ' htmlFor="">Email Address</label>
                        <input className='p-2  bg-slate-100 border outline-none border-gray-300 border-[1px] rounded-sm px-3' type="email" placeholder='john@exemple.com' />
                    </div>
                    <div className='flex gap-2 flex-col mt-4'>
                        <label className='font-meduim text-[15px] text-gray-900 ' htmlFor="">Password</label>
                        <div className=' p-2 flex items-center justify-between border px-3 border-gray-300 border-[1px] rounded-sm  bg-slate-100'>
                            <input className='  border-none outline-none font-medium    ' type={!showPassword ? "password" : "text"} placeholder='Min 8 characters' />
                            <div className='text-gray-400' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Eye size={20} /> : <EyeOff size={20} />} </div>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-col mt-4'>
                        <label className='font-meduim text-[15px] text-gray-900 ' htmlFor="">Admin Invite Token</label>
                        <input className='p-2 bg-slate-100 border outline-none border-gray-300 border-[1px] rounded-sm px-3' type="email" placeholder='6 Digit Code' />
                    </div>
                </div>
                <Link className='w-full bg-blue-600 text-white text-center py-3 my-3 rounded-md text-[15px] hover:text-blue-900 hover:bg-blue-200 transition-all ' href={'/'}><button className='uppercase cursor-pointer' type='submit'>SignUp</button></Link>
            </form>
            <p className='text-[15px] font-medium'>Already have an account? <Link className='text-blue-500 underline' href={'/login'}>Login</Link></p>



        </div>
    )
}

export default register

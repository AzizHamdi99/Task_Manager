"use client"
import React, { useState } from 'react'
import { BookOpenCheck, Camera, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useUser'
function register() {

    const router = useRouter()

    const { register } = useAuthStore()

    const [showPassword, setShowPassword] = useState(false)

    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = async () => {
            const base64Image = reader.result
            setSelectedImg(base64Image)
            // await updateProfile({ profilePic: base64Image })
        }

    }

    const [data, setData] = useState({
        fullname: "",
        email: "",
        password: "",
        pic: "",
        code: ""
    })

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))

    }

    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await register(data)
            router.push('/dashboard')

        } catch (error: any) {
            console.error(error)

        }


    }

    return (
        <div className='flex flex-col w-1/2'>
            <div className='flex gap-1  '>
                <BookOpenCheck color="blue" size={40} />
                <p className='font-bold text-2xl text-black mb-28'>Task Manager</p>
            </div>
            <h2 className='font-bold text-2xl text-black'>Create an account </h2>

            <p className='text-gray-900 text-sm font-extralight mt-1 '>Join us today by entrning your details below</p>
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <Image
                        src={selectedImg || "/nppdp.webp"}
                        width={70}
                        height={70}
                        alt="Profile"
                        className="rounded-full object-cover border-4 "
                    />
                    <label
                        htmlFor="avatar-upload"
                        className={`
                             absolute bottom-0 right-0 
                             bg-base-content hover:scale-105
                             p-2 rounded-full cursor-pointer 
                             transition-all duration-200 : ""}
                           `}
                    >
                        <Camera className="w-5 h-5 text-base-200" />
                        <input
                            type="file"
                            id="avatar-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}

                        />
                    </label>
                </div>
                {/* <p className="text-sm text-zinc-400">
                    {isUpadtingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
                </p> */}
            </div>
            <form onSubmit={handelSubmit} className=" flex flex-col gap-2 mt-5" action="">
                <div className='grid grid-cols-2 items-center gap-3'>
                    <div className='flex gap-2 flex-col '>
                        <label className='font-meduim text-[15px] text-gray-900 ' htmlFor="">Full name </label>
                        <input value={data.fullname} name='fullname' onChange={handelChange} className='p-2  bg-slate-100 border outline-none border-gray-300 border-[1px] rounded-sm px-3' type="text" placeholder='john' />
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <label className='font-meduim text-[15px] text-gray-900 ' htmlFor="">Email Address</label>
                        <input value={data.email} name='email' onChange={handelChange} className='p-2  bg-slate-100 border outline-none border-gray-300 border-[1px] rounded-sm px-3' type="email" placeholder='john@exemple.com' />
                    </div>
                    <div className='flex gap-2 flex-col mt-4'>
                        <label className='font-meduim text-[15px] text-gray-900 ' htmlFor="">Password</label>
                        <div className=' p-2 flex items-center justify-between border px-3 border-gray-300 border-[1px] rounded-sm  bg-slate-100'>
                            <input value={data.password} name='password' onChange={handelChange} className='  border-none outline-none font-medium    ' type={!showPassword ? "password" : "text"} placeholder='Min 8 characters' />
                            <div className='text-gray-400' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Eye size={20} /> : <EyeOff size={20} />} </div>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-col mt-4'>
                        <label className='font-meduim text-[15px] text-gray-900 ' htmlFor="">Admin Invite Token</label>
                        <input value={data.code} name='code' onChange={handelChange} className='p-2 bg-slate-100 border outline-none border-gray-300 border-[1px] rounded-sm px-3' type="text" placeholder='6 Digit Code' />
                    </div>
                </div>
                <button className='uppercase cursor-pointer w-full bg-blue-600 text-white text-center py-3 my-3 rounded-md text-[15px] hover:text-blue-900 hover:bg-blue-200 transition-all ' type='submit'>SignUp</button>
            </form>
            <p className='text-[15px] font-medium'>Already have an account? <Link className='text-blue-500 underline' href={'/login'}>Login</Link></p>



        </div>
    )
}

export default register

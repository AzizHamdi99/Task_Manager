import { BookOpenCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <Link href={"/dashboard"}>
            <div className='flex p-3 px-6 items-center gap-1 border-b-1 border-b-gray-200'>
                <BookOpenCheck color="blue" size={40} />
                <p className='font-bold text-2xl text-black '>Task Manager</p>



            </div>
        </Link>
    )
}

export default Navbar

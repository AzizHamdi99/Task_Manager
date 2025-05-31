import { BookOpenCheck } from 'lucide-react'
import React from 'react'

const Navbar = () => {
    return (
        <div className='flex p-3 px-6 border-b-1'>
            <BookOpenCheck color="blue" size={40} />
            <p className='font-bold text-2xl text-black '>Task Manager</p>



        </div>
    )
}

export default Navbar

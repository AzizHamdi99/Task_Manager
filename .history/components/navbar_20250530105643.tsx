import { BookOpenCheck } from 'lucide-react'
import React from 'react'

const Navbar = () => {
    return (
        <div className='flex '>
            <BookOpenCheck color="blue" size={40} />
            <p className='font-bold text-2xl text-black mb-44'>Task Manager</p>



        </div>
    )
}

export default Navbar

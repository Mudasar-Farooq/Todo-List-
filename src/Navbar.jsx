import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


const Navbar = () => {
    return (
        <div>
            <nav className="p-2 flex justify-between navbar navbar-expand-lg navbar-light bg-light ">
                <a style={{color: "#393971" , fontWeight: '500'}} className="navbar-brand" href="#">ITasks - Manage Your Working</a>
               <div style={{color: "#393971" , fontWeight: '400'}} className='ml-[780px] flex gap-3'>
                <button className='hover:text-black hover:underline'>
                Home
                </button>
                <button className='hover:text-black hover:underline'>
                Your Tasks
                </button>
                </div>
            </nav>

        </div>
    )
}

export default Navbar

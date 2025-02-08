import React from 'react'

function FooterComponent() {
    return (
        <div className='min-h-[40vh] w-full border border-grey relative'>
            <h1 className='text-3xl font-extrabold text-center py-5 '>Footer</h1>
            <div className='flex flex-row w-full justify-around items-center pt-2 '>
                <div>
                    <ul className='flex flex-col gap-5'>
                        <li><a className='pointer' href="/">Home</a></li>
                        <li><a className='pointer' href="/">About</a></li>
                        <li><a className='pointer' href="/">Contact</a></li>
                        </ul>
                </div>
                <div>
                <ul  className='flex flex-col gap-5'>
                        <li><a className='pointer' href="https://github.com/devenkumar1">github</a></li>
                        <li><a className='pointer' href="/">facebook</a></li>
                        <li><a className='pointer' href="/">twitter</a></li>
                        </ul>
                </div>
                <div>
                <ul  className='flex flex-col gap-5'>
                        <li><a className='pointer' href="/">explore</a></li>
                        <li><a className='pointer' href="/">movies</a></li>
                        <li><a className='pointer' href="/">ticket</a></li>
                        </ul>
                </div>
            </div>
            <h3 className='text-center text-gray-500 absolute bottom-2 w-full'>All rights reserved &copy; 2025</h3>
            <span></span>
        </div>
    )
}

export default FooterComponent
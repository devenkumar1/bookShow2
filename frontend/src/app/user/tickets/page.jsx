'use client'
import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'

import { getUserData } from '@/store/userSlice'

function UserTickets() {
const {user}=useSelector((state)=>state.user);
const tickets= user?.bookedTickets;
  return (
    <div className='w-full min-h-screen bg-gray-100 flex flex-col justify-center items-center'>
    
<div className='w-[60vw] bg-black/20 rounded-lg px-3'>
<h1 className='text-3xl font-extrabold text-center py-2 md:py-5'>Your tickets</h1>
  <div >
  {tickets && tickets.length > 0 ? (
            <h3>Tickets available</h3>
          ) : (
            <h3>No ticket found</h3>
          )}
  </div>
</div>
    </div>
  )
}

export default UserTickets
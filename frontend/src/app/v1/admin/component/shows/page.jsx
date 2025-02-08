'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import toast from 'react-hot-toast';

function ShowsPanel() {
  const navigate=useRouter();
  const [shows,setAllShows]=useState([]);

  useEffect(()=>{
    getAllShows();
    
  },[])

  const getAllShows=async()=>{
    try {
      const response=await axios.get("http://localhost:4000/auth/admin/show/allshows");
      setAllShows(response.data.shows);
      console.log(response);
    } catch (error) {
      toast.error(error);
      console.error(error);
    }
  }
  return (
    <div>
      <div className='bg-gray-100 text-black'>
        <h1>Show Panel</h1>
        
        <button className='bg-blue-500 px-5 py-3 text-lg rounded-lg' onClick={()=>navigate.push('/v1/admin/component/shows/addshow')}>Add show</button>
      </div>
    <main className='bg-gray-200 text-black mt-28'>
   {shows.length>0 && shows.map((show)=>
   <div key={show._id} className='bg-yellow-300 my-2'>
   <p>MovieId: {show.movieId}</p>
    <span>TimeSlot: </span>{show.timeSlot}
    </div>
   
   )} 
  </main>


    </div>
  )
}

export default ShowsPanel
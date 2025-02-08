'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
function TheatrePanel() {
  const [theatres, setTheatres] = useState([]);
const navigate=useRouter();
  useEffect(() => {

    getAllTheatres();
  }, []);





   const getAllTheatres = async () => {
    try {
      const response = await axios.get("http://localhost:4000/auth/admin/theatre/alltheatres");
      const data = response.data.theatres;
      console.log("all theatres", data);
      setTheatres(data);
    } catch (error) {
      console.error("Error fetching theatres:", error);
    }
  };

const handleEditTheatre = async(theatreId) => {
  
  console.log(`Edit theatre with ID: ${theatreId}`);
  try {
    const response = await axios.put(`http://localhost:4000/auth/admin/theatre/update/${theatreId}`,{withCredentials: true});
    toast.success("Theatre updated successfully!");
    getAllTheatres();
  } catch (error) {
    toast.error("movie update uncessfull");
    console.log(error);
  }
};

const handleDeleteTheatre = async(theatreId) => {
  // Handle delete theatre logic here
  ///update/:id
  console.log(`Delete theatre with ID: ${theatreId}`);
  try {
    const response = await axios.delete(`http://localhost:4000/auth/admin/theatre/delete/${theatreId}`,{withCredentials:true});
    toast.success("Theatre deleted successfully!");
    getAllTheatres();
  } catch (error) {
    toast.error("movie delete uncessfull");
    console.log(error);
  }
};





  return (
    <div className='text-black'>
      <h1 className='text-4xl font-bold ml-3 mt-16'>Theatre Panel</h1>
      <div className='bg-gray-200 w-[90%] mx-auto min-h-[50vh]'>
        <button
         className='bg-blue-500 px-5 py-2 w-[40%] md:mx-[20%] rounded-lg hover:bg-blue-700 mt-5'
         onClick={()=>navigate.push('/v1/admin/component/theatre/addtheatre')}
         
         > 
         Add theatre
         </button>
        <main>
          <h2 className='text-2xl font-semibold mt-4'>Theatres:</h2>
          <table className='min-w-full bg-white'>
            <thead>
              <tr>
                <th className='py-2 px-4 border-b'>Name</th>
                <th className='py-2 px-4 border-b'>state</th>
                <th className='py-2 px-4 border-b'>Seats</th>
                <th className='py-2 px-4 border-b'>Contact</th>
                <th className='py-2 px-4 border-b'>Edit</th>
                <th className='py-2 px-4 border-b'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {theatres.map((theatre) => (
                <tr key={theatre._id} className='text-center hover:bg-gray-100'>
                  <td className='py-2 px-2 border-b'>{theatre.name}</td>
                  <td className='py-2 px-2 border-b'>{theatre.state}</td>
                  <td className='py-2 px-2 border-b'>{theatre.totalSeats}</td>
                  <td className='py-2 px-2 border-b'>{theatre.contact}</td>
                  <td className='py-2 px-2 border-b'><button className='bg-yellow-400 px-3 py-1' onClick={()=>handleEditTheatre(theatre._id)}>Edit</button></td>
                  <td className='py-2 px-2 border-b'><button className='bg-red-700 px-4 py-1' onClick={()=>handleDeleteTheatre(theatre._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}

export default TheatrePanel;

'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AdminPanel() {
   const [moviesCount, setMoviesCount] = useState('');
   const [theatreCount, setTheatreCount] = useState('');
   const [showsCount, setShowsCount] = useState('');
   const [userCount, setUserCount] = useState('');
   const [isLoading, setIsLoading] = useState(true);

   const getDetails = async () => {
      try {
         const response = await axios.get("http://localhost:4000/auth/admin/alldetails", { withCredentials: true });
         const data = response.data;
         setMoviesCount(data.movies);
         setTheatreCount(data.theatres);
         setShowsCount(data.shows);
         setUserCount(data.users);
         setIsLoading(false);
      } catch (error) {
         console.error("Error fetching details:", error);
         setIsLoading(false);
      }
   }

   useEffect(() => {
      getDetails();
   }, []);

   if (isLoading) {
      return (
         <div className="text-center text-xl mt-16">Loading...</div>
      );
   }

   return (
      <main className="text-black bg-gray-50 flex flex-col items-center justify-center min-h-screen p-8">
         <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-center mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <div className="bg-red-200 p-6 rounded-lg shadow-md flex flex-col items-center">
                  <h2 className="text-xl font-semibold mb-2">Movies</h2>
                  <p className="text-2xl">{moviesCount}</p>
               </div>
               <div className="bg-blue-200 p-6 rounded-lg shadow-md flex flex-col items-center">
                  <h2 className="text-xl font-semibold mb-2">Theatres</h2>
                  <p className="text-2xl">{theatreCount}</p>
               </div>
               <div className="bg-green-200 p-6 rounded-lg shadow-md flex flex-col items-center">
                  <h2 className="text-xl font-semibold mb-2">Shows</h2>
                  <p className="text-2xl">{showsCount}</p>
               </div>
               <div className="bg-yellow-200 p-6 rounded-lg shadow-md flex flex-col items-center">
                  <h2 className="text-xl font-semibold mb-2">Users</h2>
                  <p className="text-2xl">{userCount}</p>
               </div>
            </div>
         </div>
      </main>
   );
}

export default AdminPanel;

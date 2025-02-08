'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getUserData } from '@/store/userSlice';
function Home() {
  const dispatch = useDispatch();
  const { userData, loading } = useSelector((state) => state.user);
  const navigate = useRouter();

useEffect(()=>{
    dispatch(getUserData());
},[]);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
      <p>Loading...</p> 
      </div>
    );
  }


  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-4xl font-bold text-center mb-4">Welcome to Our Platform</h1>
        <p className="text-lg text-gray-600 text-center mb-6">
          Join us today and experience something amazing!
        </p>
        <div className="flex space-x-4">
          <a href="/signup" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </a>
          <a href="/login" className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
            Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {userData.role==="Admin" && <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={() => navigate.push('/v1/admin')}>Admin Panel</button>}
      <h1 className="text-4xl font-bold text-center mb-4">
        Welcome, {userData?.name.toUpperCase()}!
      </h1>
      <p className="text-lg text-gray-600 text-center mb-6">
        Enjoy exploring our features and services.
      </p>
    </div>
  );
}

export default Home;

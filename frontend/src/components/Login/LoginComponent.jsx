'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '@/store/userSlice';
import axios from 'axios';

import toast from 'react-hot-toast';
import Image from 'next/image';
function LoginComponent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userData, loading } = useSelector((state) => state.user);
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  useEffect(() => {
    if (userData) {
      router.push('/home');
    }
  }, [userData, router, dispatch]);


  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  const handleOAuth = (provider) => {
    window.location.href = `${backend_url}/auth/${provider}`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backend_url}/auth/login`, formData, { withCredentials: true });
      const result = await response.data.userData;
      toast.success('Login successful');
      dispatch(setUserData(result));
      if (userData) {
        router.push('/home');
      }
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center text-gray-900">
      <div className="w-full max-w-md md:max-w-3xl md:min-h-[70vh] bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={HandleChange}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={HandleChange}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
        <div className="mt-4">
          <p className='text-center'>or</p>
          <button
            onClick={() => handleOAuth('google')}
            className="w-full py-2 bg-red-500 text-white rounded-md mt-2 flex justify-center items-center gap-2"
          >
            Sign Up with Google
            <Image src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png" alt="Google Logo" width={20} height={20} className="mr-2"></Image>

          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;

'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { setUserData } from '@/store/userSlice';
import { SpotlightCard } from './SpotlightCard';
import axios from 'axios';
import Image from 'next/image';
function Signup() {
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { userData, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (userData) {

      navigate.push('/home');
    }
  }, [userData, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = { name: '', email: '', password: '' };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = 'Full name is required';
      isValid = false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        const response = await axios.post("http://localhost:4000/auth/signup", formData, { withCredentials: true });
        const result = await response.data.userData;
        dispatch(setUserData(result));
        if (result) {
          toast.success('Signup successful');
          navigate.push('/home');
        }
      } catch (err) {
        toast.error(typeof err === 'string' ? err : 'Signup failed');
      }
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `${backend_url}/auth/${provider}`;
  };

  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col mt-30">
        <h1 className="font-extrabold text-3xl md:text-5xl flex justify-center items-center text-center pt-5 pb-5 md:pb-1 md:pt-36">
          Welcome to Signup Page
        </h1>
        <div className="flex md:flex-row flex-col-reverse gap-8 justify-around items-center min-h-screen">
          <div className="bg-white text-black p-8 rounded-lg shadow-lg md:w-1/2 min-h-[40vh] w-full gap-2 md:min-h-[60vh]">
            <h1 className="text-2xl font-semibold mb-4">Enter Required Fields</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm">Password (min 6 characters)</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>
              <button type="submit" className={`w-full py-2 bg-blue-600 text-white rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>
            <div className="mt-4">


            </div>

            <br />
            <span>Already have an account?</span>
            <Link href="/login" className="text-blue-600">Login</Link>
            <p className='text-center'>or</p>
            <button
              onClick={() => handleOAuth('google')}
              className="w-full py-2 bg-red-500 text-white rounded-md mt-2 flex items-center justify-center gap-2"
            >
              Sign Up with Google
              <Image src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png" alt="Google Logo" width={20} height={20} className="mr-2"></Image>

            </button>
          </div>
          <SpotlightCard />
        </div>
      </div>
    </div>
  );
}

export default Signup;

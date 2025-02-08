'use client'

import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function AddTheatre() {
  const [states] = useState([
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry"
  ]);

  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]); // Cities based on selected state
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    totalSeats: "",
    contact: "",
    state: "",
    city: ""
  });
const navigate=useRouter();
  // API call to fetch cities based on selected state
  const handleStateChange = async (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setFormData({ ...formData, state, city: "" }); 

    if (state) {
      try {
        const response = await axios.get(`http://localhost:4000/auth/state/${state}`);
        // Set cities based on the response
        setCities(response.data.cities || []);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCities([]);
      }
    } else {
      setCities([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "city") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const handleAddMovie=async(e)=>{
  e.preventDefault();
  try {
    const response=await axios.post('http://localhost:4000/auth/admin/theatre/add',formData,{withCredentials:true});
   
      toast.success("Theatre added successfully");
      
      navigate.push('/v1/admin/component/theatre'); 
    } catch (error) {
      toast.error('theatre not added');
    console.log("theatre not added",error);
  }
}
  return (
    <div className='bg-gray-800 text-white p-8 rounded-lg'>
      <h1 className='text-4xl mb-6 text-center'>Add Theatre</h1>
      <form onSubmit={handleAddMovie}>
        <div className='mb-4'>
          <label htmlFor="name" className='block text-lg'>Theatre Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className='bg-gray-700 text-white p-2 w-full rounded'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor="location" className='block text-lg'>Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className='bg-gray-700 text-white p-2 w-full rounded'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor="totalSeats" className='block text-lg'>Total Seats:</label>
          <input
            type="number"
            id="totalSeats"
            name="totalSeats"
            required
            value={formData.totalSeats}
            onChange={handleChange}
            className='bg-gray-700 text-white p-2 w-full rounded'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor="contact" className='block text-lg'>Contact:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            required
            value={formData.contact}
            onChange={handleChange}
            className='bg-gray-700 text-white p-2 w-full rounded'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor="state" className='block text-lg'>State:</label>
          <select
            name="state"
            id="state"
            value={formData.state}
            onChange={handleStateChange}
            className='bg-gray-700 text-white p-2 w-full rounded'>
            <option value="">Select a State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor="city" className='block text-lg'>City:</label>
          <select
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
            className='bg-gray-700 text-white p-2 w-full rounded'>
            <option value="">Select a City</option>
            {cities.map((city) => (
              <option key={city._id} value={city.name}>
                {city.name} 
              </option>
            ))}
          </select>
        </div>


        <div className='flex justify-center'>
          <button type="submit" className='bg-blue-600 p-3 w-1/2 rounded text-white hover:bg-blue-700'>
            Add Theatre
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTheatre;

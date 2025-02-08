'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getAllMovies } from '@/store/MovieSlice';
import { useDispatch, useSelector } from 'react-redux';

function AddShowPanel() {
    const dispatch = useDispatch();
    const { movies, loading } = useSelector((state) => state.movies);

    const [states] = useState([
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
        "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
        "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
        "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry"
    ]);
    const [cities, setCities] = useState([]);
    const [theatres, setTheatres] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [formData, setFormData] = useState({
        theatreId: "",
        movieId: "",
        timeSlot: "",
        status: "",
        availableSeats: "",
        price: ""
    });

    const navigate = useRouter();

    useEffect(() => {
        // Fetch movies when the component mounts
        dispatch(getAllMovies());
    }, [dispatch]);

    const handleFormDataChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            console.log("The form data is", formData);
            const response = await axios.post("http://localhost:4000/auth/admin/show/add", formData, { withCredentials: true });
            console.log(response);
            toast.success("Show added successfully");
            navigate.push('/v1/admin/component/shows');
        } catch (error) {
            toast.error("Show not added");
            console.log("Show not added", error);
        }
    };

    const handleStateChange = async (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setCities([]);
        setTheatres([]);

        if (state) {
            try {
                const response = await axios.get(`http://localhost:4000/auth/state/${state}`);
                setCities(response.data.cities);
            } catch (error) {
                setCities([]);
                console.log('Error fetching cities:', error);
            }
        }
    };

    const handleCityChange = async (e) => {
        const city = e.target.value;
        setSelectedCity(city);
        setTheatres([]);

        if (city) {
            try {
                const response = await axios.get(`http://localhost:4000/auth/city/theatre/${city}`);
                setTheatres(response.data.theatres);
            } catch (error) {
                console.log('Error fetching theatres:', error);
            }
        }
    };
    return (
        <div className="flex justify-center items-center bg-gray-100 min-h-screen p-4 text-black">
            <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-lg mt-28">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="state" className="block text-lg font-semibold text-gray-700">State</label>
                        <select
                            name="state"
                            id="state"
                            onChange={handleStateChange}
                            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select State</option>
                            {states.map((state) => (
                                <option value={state} key={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="city" className="block text-lg font-semibold text-gray-700">City</label>
                        <select
                            name="city"
                            id="city"
                            onChange={handleCityChange}
                            className="w-full p-3 border text-black border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option value={city.name} key={city._id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="theatreId" className="block text-lg font-semibold text-gray-700">Theatre</label>
                        <select
                            name="theatreId"
                            id="theatreId"
                            onChange={handleFormDataChange}
                            className="w-full p-3 border text-black border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Theatre</option>
                            {theatres.map((theatre) => (
                                <option value={theatre._id} key={theatre._id}>
                                    {theatre.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="movieId" className="block text-lg font-semibold text-gray-700">Movie</label>
                        <select
                            name="movieId"
                            id="movieId"
                            onChange={handleFormDataChange}
                            className="w-full p-3 border text-black border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Movie</option>
                            {movies && movies.map((selectedmovie) => (
                                <option value={selectedmovie._id} key={selectedmovie._id}>
                                    {selectedmovie.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="timeSlot" className="block text-lg font-semibold text-gray-700">Date and time</label>
                        <input
                            type="datetime-local"
                            id="timeSlot"
                            name="timeSlot"
                            onChange={handleFormDataChange}
                            className="w-full p-3 border text-black border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="availableSeats" className="block text-lg font-semibold text-gray-700">Total seats</label>
                        <input
                            type="number"
                            id="availableSeats"
                            name="availableSeats"
                            onChange={handleFormDataChange}
                            className="w-full p-3 border text-black border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-lg font-semibold text-gray-700">Ticket price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            onChange={handleFormDataChange}
                            className="w-full p-3 border text-black border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-lg font-semibold text-gray-700">Status</label>
                        <select
                            name="status"
                            id="status"
                            onChange={handleFormDataChange}
                            className="w-full p-3 border text-black border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="upcoming">Upcoming</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex justify-center">
                        <button className="bg-[#6D64F7] text-white px-4 py-2 rounded-md">
                            Create a show
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddShowPanel;

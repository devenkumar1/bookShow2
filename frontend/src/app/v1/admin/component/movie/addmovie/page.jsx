'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { getAllMovies } from '@/store/MovieSlice'
import { useRouter } from 'next/navigation'

function AddMovie() {
    const navigate = useRouter();
    const [title, setTitle] = useState("");
    const [posterImage, setPosterImage] = useState("");
    const [description, setDescription] = useState("");
    const [genere, setGenere] = useState("");
    const [language, setLanguage] = useState("");
    const [duration, setDuration] = useState("");
    const [rating, setRating] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const dispatch = useDispatch();

    // Set isMounted to true once the component has mounted on the client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const addMovie = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("posterImage", posterImage); // Ensure it's a File, not Base64
        formData.append("description", description);
        formData.append("genere", genere);
        formData.append("language", language);
        formData.append("duration", duration);
        formData.append("rating", rating);
        formData.append("releaseDate", releaseDate);

        // Debugging: Log FormData values
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            const response = await axios.post("http://localhost:4000/auth/admin/movie/add",
                formData,
                { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
            );
            console.log(response);
            dispatch(getAllMovies());
            toast.success("Movie added successfully");
        } catch (error) {
            console.error("Error Response:", error.response?.data); // Log the server response
            toast.error("Movie not added");
        }
    };

    // Fix handleImageChange
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPosterImage(file); // Store file, not Base64
        }
    };


    if (!isMounted) {
        return null; 
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-6">
            <h1 className="text-3xl font-bold text-center mb-8">Movie Panel</h1>

            <div className="w-full max-w-xl bg-white text-black p-8 rounded-lg shadow-lg">
                <form className="flex flex-col gap-4" encType="multipart/form-data" onSubmit={addMovie}>
                    <label htmlFor="posterImage" className="font-semibold text-lg">Poster Image</label>
                    <input
                        type='file'
                        name="posterImage"
                        id="posterImage"
                        className="p-3 border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleImageChange}
                    />

                    <label htmlFor="title" className="font-semibold text-lg">Movie Title</label>
                    <input
                        type="text"
                        placeholder="Enter movie title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="p-3 border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label htmlFor="description" className="font-semibold text-lg">Movie Description</label>
                    <input
                        type="text"
                        placeholder="Enter movie description"
                        name="description"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-3 border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label htmlFor="genre" className="font-semibold text-lg">Genre</label>
                    <input
                        type="text"
                        placeholder="Enter genre"
                        name="genre"
                        id="genre"
                        value={genere}
                        onChange={(e) => setGenere(e.target.value)}
                        className="p-3 border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label htmlFor="language" className="font-semibold text-lg">Language</label>
                    <input
                        type="text"
                        placeholder="Enter movie language"
                        name="language"
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="p-3 border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label htmlFor="rating" className="font-semibold text-lg">Rating</label>
                    <input
                        type="number"
                        placeholder="Enter rating"
                        name="rating"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="p-3 border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label htmlFor="duration" className="font-semibold text-lg">Duration (minutes)</label>
                    <input
                        type="number"
                        placeholder="Enter duration"
                        name="duration"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="p-3 border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label htmlFor="releaseDate" className="font-semibold text-lg">Release Date</label>
                    <input
                        type="date"
                        name="releaseDate"
                        id="releaseDate"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        className="p-3 border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6"
                    >
                        Add Movie
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddMovie;

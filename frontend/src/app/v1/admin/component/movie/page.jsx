'use client';
import React from 'react'
import { getAllMovies } from '@/store/MovieSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

function MoviePanel() {
  const { movies, loading } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const navigate = useRouter();

  const handleDeleteMovie = async (movieId) => {
    console.log(movieId);
    try {
      const response = await axios.delete(`http://localhost:4000/auth/admin/movie/delete/${movieId}`, { withCredentials: true });
      console.log(response);
      dispatch(getAllMovies());
      toast.success("Movie deleted successfully!");
    } catch (error) {
      toast.error("Error deleting movie.");
      console.log(error);
    }
  }

  const handleUpdateMovie = (movieId) => {
    navigate.push(`/v1/admin/component/movie/edit/${movieId}`);
  }

  return (
    <div className='w-full min-h-screen bg-gray-100 px-2 text-black py-5'>
      <div className='py-6'>
        <h1 className='text-4xl font-bold text-black mb-6'>Movie Panel</h1>
        <div className='w-[80%] mx-auto mb-6'>
          <Link href={'/v1/admin/component/movie/addmovie'}>
            <button className='bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300'>
              Add Movie
            </button>
          </Link>
        </div>

        <h2 className='text-3xl font-semibold text-black mb-4'>All Movies</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {movies.map((movie) => (
            <div key={movie._id} className='bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300'>
              <h3 className='text-xl font-bold mb-2'>{movie?.title}</h3>
              <p className='text-gray-700 mb-4'>{movie?.description.slice(0, 60)}...</p>
              <p className='text-gray-600 mb-2'>Duration: {movie?.duration} minutes</p>
              <p className='text-gray-600 mb-4'>Language: {movie?.language}</p>
              <div className='flex justify-between'>
                <button
                  className='bg-yellow-500 text-white py-1 px-4 rounded-md hover:bg-yellow-600 transition duration-300'
                  onClick={() => handleUpdateMovie(movie?._id)}
                >
                  Edit
                </button>
                <button
                  className='bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition duration-300'
                  onClick={() => handleDeleteMovie(movie?._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MoviePanel

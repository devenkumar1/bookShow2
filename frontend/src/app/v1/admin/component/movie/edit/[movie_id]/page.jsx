'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getAllMovies } from '@/store/MovieSlice';

const EditMovie = ({ params }) => {
const { movie_id } = React.use(params);
const navigate=useRouter();
const dispatch=useDispatch();
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    duration: '',
    language: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (movie_id) {
      fetchMovie();
    }
  }, [movie_id]);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/auth/movie/${movie_id}`);
      console.log("movie fetched response", response);
      dispatch(getAllMovies());
      const oneMovie = await response.data.Movie;
      setMovie(oneMovie);
      setLoading(false);  
    } catch (error) {
      toast.error('Error fetching movie data');
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4000/auth/admin/movie/update/${movie_id}`, movie, { withCredentials: true });
      
      toast.success('Movie updated successfully!');
      navigate.push('/v1/admin/component/movie');
    } catch (error) {
      toast.error('Error updating movie');
      console.log(error);
    }
  };

  if (loading || !movie_id) {
    return <div>Loading...</div>;  
  }

  return (
    <div className='w-full min-h-screen bg-gray-100 px-2 text-black py-5'>
      <h1 className='text-4xl font-bold text-black mb-6'>Edit Movie</h1>
      <form onSubmit={handleSubmit} className='w-[80%] mx-auto'>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            name='title'
            value={movie.title}
            onChange={handleChange}
            className='w-full p-3 rounded-md'
          />
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            name='description'
            value={movie.description}
            onChange={handleChange}
            className='w-full p-3 rounded-md'
          />
        </div>
        <div>
          <label htmlFor='duration'>Duration (in minutes)</label>
          <input
            type='number'
            id='duration'
            name='duration'
            value={movie.duration}
            onChange={handleChange}
            className='w-full p-3 rounded-md'
          />
        </div>
        <div>
          <label htmlFor='language'>Language</label>
          <input
            type='text'
            id='language'
            name='language'
            value={movie.language}
            onChange={handleChange}
            className='w-full p-3 rounded-md'
          />
        </div>
        <button type='submit' className='bg-blue-600 text-white py-3 px-6 rounded-lg mt-6'>
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default EditMovie;

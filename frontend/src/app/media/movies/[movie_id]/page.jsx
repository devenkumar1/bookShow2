'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';

function SelectedMovie({ params }) {
  const movie_id = React.use(params);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    language: '',
    releaseDate: '',
    tags: '',
    genere: '',
    duration: '',
    rating: '',
    posterUrl: ''
  });

  useEffect(() => {
    if (movie_id.movie_id) {
      setLoading(true);
      fetchMovie();
    }
  }, [movie_id]);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/auth/movie/${movie_id.movie_id}`);
      const currentMovie = await response.data.Movie;
      setMovie(currentMovie);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Movie loading failed');
    }
  };

  if (loading) {
    return <div className="text-center text-xl font-semibold p-5">Loading, please wait...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <h1 className="font-extrabold text-4xl p-5 text-center text-gray-900">Movie Details</h1>
      <div className="w-[80%] mx-auto flex flex-col gap-7 bg-white p-5 rounded-lg shadow-lg pb-4 ">
        {movie.posterUrl && movie.posterUrl !== "" ? (
          <div className="w-full flex justify-center">
            <Image height={300} width={300} src={movie.posterUrl} alt="movie poster" className="rounded-lg" />
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <div className="w-48 h-48 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">No Image</div>
          </div>
        )}

        <div className="flex flex-col items-center text-lg text-gray-700 gap-2 ">
          <h2 className="text-2xl font-semibold">{movie.title}</h2>
          <p><strong>Release Date:</strong> {movie.releaseDate}</p>
          <p><strong>Duration:</strong> {movie.duration / 60} hours</p>
          <p><strong>Genre:</strong> {movie.genere}</p>
          <p><strong>Description:</strong> {movie.description}</p>
        </div>
        <button className="w-full py-4 text-2xl text-white bg-blue-600 rounded-lg hover:bg-blue-700 mt-4 transition-all">
          Book Ticket
        </button>
      </div>
    </div>
  );
}

export default SelectedMovie;

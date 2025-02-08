'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovies } from '@/store/MovieSlice'
import { useRouter } from 'next/navigation'

function MoviesPage() {
  const [isClient, setIsClient] = useState(false);
  const { movies, loading } = useSelector((state) => state.movies)
  const dispatch = useDispatch()
  const navigate = useRouter();

  useEffect(() => {
    dispatch(getAllMovies())
    setIsClient(true);
  }, [dispatch])

  const toggleDetails = (id) => {
    setOpenMovieId(openMovieId === id ? null : id)
  }

  if (!isClient) {
    return null;
  }

  if (loading) return <div className="text-center">Loading movies...</div>

  return (
    <div className='w-full bg-gray-100 min-h-screen p-5 flex flex-col md:flex-row flex-wrap gap-5'>
      {movies.map((movie) => (
        <div
          key={movie._id}
          className='bg-white text-black w-[250px] h-[350px] rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 flex flex-col '
          onClick={() => navigate.push(`/media/movies/${movie._id}`)}
        >
          <div className="relative w-[90%] h-[50%] flex justify-center  ">
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              width={120}
              height={120} 
              loading='lazy'
              className="object-cover rounded-t-lg"
            />
          </div>

          <div className="p-4 h-[40%] overflow-hidden">
            <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
            <p className="text-sm text-gray-600">{movie.releaseDate}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-yellow-500 font-semibold">{movie.rating}</span>
            </div>
          </div> 
        </div>
      ))}
    </div>
  )
}

export default MoviesPage

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { stateArray } from "@/utils/State";
import { getUserData } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { initiatePayment } from "@/utils/loadRazorpay";

function ShowsPage() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [states] = useState(stateArray);
  const [cities, setCities] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTheatre, setSelectedTheatre] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShow, setSelectedShow] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      return;
    }
    axios
      .get(`${backendUrl}/auth/state/${selectedState}`)
      .then(({ data }) => setCities(data.cities))
      .catch(() => toast.error("Failed to fetch cities"));
  }, [selectedState]);

  useEffect(() => {
    if (!selectedCity) {
      setTheatres([]);
      return;
    }
    axios
      .get(`${backendUrl}/auth/city/theatre/${selectedCity}`)
      .then(({ data }) => setTheatres(data.theatres))
      .catch(() => toast.error("Failed to fetch theatres"));
  }, [selectedCity]);

  useEffect(() => {
    if (!selectedTheatre) {
      setMovies([]);
      return;
    }
    axios
      .get(`${backendUrl}/auth/getMoviesForTheatre/${selectedTheatre}`)
      .then(({ data }) => setMovies(data.movies))
      .catch(() => toast.error("Failed to fetch movies"));
  }, [selectedTheatre]);

  useEffect(() => {
    if (!selectedMovie || !selectedTheatre || !selectedDate) {
      setShows([]);
      return;
    }
    axios
      .get(`${backendUrl}/auth/shows/${selectedTheatre}/${selectedMovie}/${selectedDate}`)
      .then(({ data }) => setShows(data.shows))
      .catch(() => toast.error("Failed to fetch shows"));
  }, [selectedMovie, selectedTheatre, selectedDate]);

  const handleBooking = async () => {
    if (!selectedShow || !quantity) {
      toast.error('Please select a show and ticket quantity');
      return;
    }
  
    const total = selectedShow.price * Number(quantity);
    setTotalPrice(total);
    setLoading(true);
  
    try {
      const paymentResponse = await initiatePayment(
        total,
        userData.email,
        userData._id,
        selectedShow._id,
        Number(quantity),
        total
      );
  
      if (paymentResponse.success) {
        toast.success('Booking successful!');
      } else {
        toast.error('Payment failed. Booking not completed.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Payment failed or cancelled. Booking not completed.');
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white flex flex-col justify-center py-12">
      <h1 className="text-4xl font-extrabold text-center text-white mb-8">Choose a Show</h1>

      <div className="w-[90%] max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 text-gray-800">
        <form className="flex flex-col gap-6">
          <label className="font-semibold">
            State:
            <select className="block w-full mt-2 p-3 border rounded-lg" onChange={(e) => setSelectedState(e.target.value)}>
              <option value="">Select a State</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </label>

          <label className="font-semibold">
            City:
            <select className="block w-full mt-2 p-3 border rounded-lg" onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="">Select a City</option>
              {cities.map((city) => (
                <option key={city._id} value={city.name}>{city.name}</option>
              ))}
            </select>
          </label>

          <label className="font-semibold">
            Theatre:
            <select className="block w-full mt-2 p-3 border rounded-lg" onChange={(e) => setSelectedTheatre(e.target.value)}>
              <option value="">Select a Theatre</option>
              {theatres.map((theatre) => (
                <option key={theatre._id} value={theatre._id}>{theatre.name}</option>
              ))}
            </select>
          </label>

          <label className="font-semibold">
            Movie:
            <select className="block w-full mt-2 p-3 border rounded-lg" onChange={(e) => setSelectedMovie(e.target.value)}>
              <option value="">Select a Movie</option>
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>{movie.title}</option>
              ))}
            </select>
          </label>

          <label className="font-semibold">
            Show Date:
            <input type="date" className="block w-full mt-2 p-3 border rounded-lg" onChange={(e) => setSelectedDate(e.target.value)} />
          </label>

          <label className="font-semibold">
            Show:
            <select className="block w-full mt-2 p-3 border rounded-lg" onChange={(e) => setSelectedShow(shows.find((show) => show._id === e.target.value))}>
              <option value="">Select a Show</option>
              {shows.map((show) => (
                <option key={show._id} value={show._id}>
                  {new Date(show.timeSlot).toLocaleString()} - {show.availableSeats} seats left - ₹{show.price}
                </option>
              ))}
            </select>
          </label>

          <label className="font-semibold">
            Ticket Quantity:
            <input type="number" className="block w-full mt-2 p-3 border rounded-lg" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </label>

          <button onClick={handleBooking} disabled={loading} className="py-3 bg-indigo-600 text-white rounded-lg font-bold mt-4">
            {loading ? "Booking..." : "Book Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ShowsPage

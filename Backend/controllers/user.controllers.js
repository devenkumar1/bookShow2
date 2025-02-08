import User from "../models/user.model.js";
import ticket from "../models/ticket.model.js";
import movie from "../models/movie.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import City from "../models/city.model.js";
import theatre from "../models/theatre.model.js";
import show from "../models/show.model.js";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "all fields are mandatory" });
  }
  try {
    const olduser = await User.findOne({ email });
    if (!olduser) {
      return res
        .status(500)
        .json({ message: "Account doesn't exits or invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, olduser.password);
    if (!isPasswordMatch) {
      return res.status(500).json({ message: "Invalid credentials" });
    }
    const JWT_SECRET = process.env.JWT_SECRET;

    const token = jwt.sign({ id: olduser._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    const userData = await User.findOne({ email }).select("-password");

    return res
      .cookie("token", token, {
        httpOnly: true,
        // secure: process.env.?NODE_ENV === 'production',
        expiresIn: 30 * 24 * 60 * 60 * 1000,
        sameSite: "Lax",
      })
      .status(200)
      .json({ message: "login succesful", userData });
  } catch (error) {
    console.log("error while user login", error);
    res.status(500).json({ message: "Invalid credentials" });
  }
};
export const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "all fields are mandatory" });
  }
  try {
    let useralreadyExists = await User.findOne({ email });
    if (useralreadyExists) {
      return res.status(400).json({ message: "account already exists" });
    }

    //hashing password with bcrypt
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const JWT_SECRET = process.env.JWT_SECRET;

    //generating jwt token
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    const userData = await User.findOne({ email }).select("-password");

    return res
      .cookie("token", token, {
        httpOnly: true,
        // secure: process.env.?NODE_ENV === 'production',
        expiresIn: 10 * 24 * 60 * 60 * 1000,
        sameSite: "Lax",
      })
      .status(201)
      .json({ userData, message: "signup successful" });
  } catch (err) {
    console.log("error while user signup", err);
    res.status(500).json({ message: "something went wrong" });
  }
};
export const userLogout = async (req, res) => {
  try {
    // Set the cookie value to an empty string and expire the cookie immediately
    res.cookie("token", "", {
      httpOnly: true,
      maxAge: 0, // Sets cookie expiration to immediate past time
      sameSite: "Lax", // Make sure SameSite is set for cross-origin requests
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const showTickets = async (req, res) => {
  try {
    const tickets = await ticket.find();
    res.status(200).json({ tickets: tickets });
  } catch (error) {
    console.log("error while showing tickets", error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const getUserData = async (req, res) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const providedToken = req.cookies.token;
    if (!providedToken) {
      return res.status(401).json({ message: "unauthorized access" });
    }
    const decoded = jwt.verify(providedToken, JWT_SECRET);
    const userData = await User.findById(decoded.id).select("-password");
    return res.status(200).json({ userData });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, phonenumber } = req.body;
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken.id);
    const currentUser = await user.findByIdAndUpdate(
      decodedToken.id,
      { name, phonenumber },
      { new: true }
    );
    console.log("user found");
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const userData = await User.findById(decodedToken.id).select("-password");
    console.log("updated user successfully");
    return res.status(200).json({ currentUser, userData });
  } catch (error) {
    console.log("Error occurred in updating user profile", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
//get all movies
export const getAllMovies = async (req, res) => {
  const movies = await movie.find();
  return res.status(200).json({ movies });
};

export const getOneMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const Movie = await movie.findById(id);
    return res.status(200).json({ Movie });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const getTheatresInCity = async (req, res) => {
  const { city } = req.params;

  try {
    const theatres = await theatre.find({ city: city });
    return res
      .status(200)
      .json({ message: "theatres found in the city", theatres });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong in fetching theatres" });
  }
};

export const getCityByState = async (req, res) => {
  const { state } = req.params;
  try {
    // Filter by the state field
    const cities = await City.find({ state });
    if (!cities || cities.length === 0) {
      return res.status(404).json({ message: "no city found", cities: [] });
    }
    // Returning the cities
    return res.status(200).json({ message: "cities found", cities });
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ message: "something went wrong" });
    throw error;
  }
};




export const getMoviesForTheatre = async (req, res) => {
  const { theatreId } = req.params;

  try {
    // Find the theatre by ID and get the movie references
    const Theatre = await theatre.findById(theatreId)
    .populate({
      path: 'shows', 
      populate: {
        path: 'movieId', // Populate the movieId field in each show
        model: 'movie',
      },
    });
    if (!Theatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    // Collect movie IDs from the shows associated with the theatre
    const movieIds = Theatre.shows.map((show) => show.movieId);

    // Fetch all the movies using the movieIds
    const movies = await movie.find({ _id: { $in: movieIds } });

    res.json({ movies });
  } catch (error) {
    console.error("Error fetching movies for theatre:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Fetch Shows for a selected movie, theatre, and date
export const getShowsForMovie = async (req, res) => {
  const { theatreId, movieId, date } = req.params;

  try {
    const showDate = new Date(date);

    const startOfDay = new Date(showDate.setHours(0, 0, 0, 0));

    const endOfDay = new Date(showDate.setHours(23, 59, 59, 999));

    // Find the shows based on the selected theatreId, movieId, and show date
    const shows = await show.find({
      theatreId,
      movieId,
      timeSlot: {
        $gte: startOfDay+1,  
        $lte: endOfDay+1,    
      },
    }).populate('movieId theatreId');

    res.json({ shows });
  } catch (error) {
    console.error('Error fetching shows:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

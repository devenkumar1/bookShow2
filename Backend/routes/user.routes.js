import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import {
  userLogin,
  userLogout,
  userSignup,
  getUserData,
  updateUserProfile,
  getAllMovies,
  getOneMovie,
  getCityByState,
  getTheatresInCity,
  getMoviesForTheatre,
  getShowsForMovie,
} from "../controllers/user.controllers.js";

const router = Router();

router.get("/test", (req, res) => {
  res.send("welcome to auth/test route");
});

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: `${process.env.FRONTEND_URI}/login`, // redirect if authentication fails
}), async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = jwt.sign({ id: req.user._id }, JWT_SECRET, { expiresIn: '1d' });
  res.cookie('token', token, { httpOnly: true, sameSite: 'Lax', expiresIn: 30 * 24 * 60 * 60 * 1000 });
  res.redirect(`${process.env.FRONTEND_URI}/home`); 
});

router.post("/login", userLogin);
router.post("/signup", userSignup);
router.get("/logout", userLogout);
router.post("/getuserdata", getUserData);
router.put("/updateprofile", updateUserProfile);
router.get("/media/movies", getAllMovies);
router.get("/movie/:id", getOneMovie);
router.get("/state/:state", getCityByState);

// Get theatres by city name
router.get("/city/theatre/:city", getTheatresInCity);

router.get("/getMoviesForTheatre/:theatreId", getMoviesForTheatre);
router.get("/shows/:theatreId/:movieId/:date", getShowsForMovie);

export default router;

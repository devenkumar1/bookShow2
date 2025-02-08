import show from "../models/show.model.js";
import movie from "../models/movie.model.js";
import theatre from "../models/theatre.model.js";

export const addShow = async (req, res) => {
  const { movieId, theatreId, timeSlot, availableSeats, price, status } =
    req.body;
  if (
    !movieId ||
    !theatreId ||
    !timeSlot ||
    !availableSeats ||
    !price ||
    !status
  ) {
    return res.status(400).json({ message: "all fields are mandatory" });
  }
  try {
    const newShow = await show.create({
      movieId,
      theatreId,
      timeSlot,
      availableSeats,
      price,
      status,
    });
    //adding the show in the particular theatre and pushing the show in the theatre
    const selectedTheatre = await theatre.findById(theatreId);
    selectedTheatre.shows.push(newShow._id);
    await selectedTheatre.save();
    return res.status(201).json({ message: "show added successfully" });
  } catch (error) {
    console.log("something went wrong in adding show", error);
    return res.status(500).json({ message: "adding show unsuccessful" });
  }
};

export const updateShow = async (req, res) => {
  const { id } = req.params;
  const { movieId, theatreId, timeSlot, availableSeats, price, status } =
    req.body;
  try {
    const selectedShow = await show.findByIdAndUpdate(
      id,
      { movieId, theatreId, timeSlot, availableSeats, price },
      { new: true }
    );
    return res.status(200).json({ message: "show updated successfully" });
  } catch (error) {
    console.log("something went wrong in updating show", error);
    return res.status(500).json({ message: "updating show unsuccessful" });
  }
};

export const deleteShow = async (req, res) => {
  const { id } = req.params;
  try {
    const selectedShow = await show.findByIdAndDelete(id);
    return res.status(200).json({ message: "show deleted successfully" });
  } catch (error) {
    console.log("something went wrong in deleting show", error);
    return res.status(500).json({ message: "deleting show unsuccessful" });
  }
};

export const getAllShowsAvailable = async (req, res) => {
  try {
    const shows = await show.find();
    res.status(200).json({ message: "fetched all shows", shows });
  } catch (error) {
    console.log("something went wrong in fetching shows", error);
    res.status(500).json({ message: "fetching shows unsuccessful" });
  }
};

import movie from "../models/movie.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

export const addMovie = async (req, res) => {
    const { title, description, genere, language, duration, rating, releaseDate } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const localFilePath = req.file.path;
    const uploadResponse = await uploadOnCloudinary(localFilePath);

    if (!uploadResponse) {
        return res.status(500).json({ message: 'Error uploading to Cloudinary' });
    }

    const posterUrl = uploadResponse.secure_url;

    if (!title || !description || !genere || !language || !duration || !rating || !releaseDate || !posterUrl) {
        return res.status(400).json({ message: "All fields are mandatory" });
    }

    try {
        const newMovie = await movie.create({
            title,
            description,
            genere,
            language,
            duration,
            rating,
            releaseDate,
            posterUrl
        });

        console.log("New movie added");
        return res.status(201).json({ message: "Movie added successfully", movie: newMovie });

    } catch (error) {
        console.log("Error adding movie:", error);
        // Ensure the local file is deleted if adding the movie fails
        fs.unlinkSync(localFilePath);
        return res.status(500).json({ message: "Adding movie unsuccessful" });
    }
};

export const deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const selectedMovie = await movie.findByIdAndDelete(id);
        return res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        console.log("Something went wrong in deleting movie:", error);
        return res.status(500).json({ message: "Deleting movie unsuccessful" });
    }
};

export const updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title, description,  language, duration } = req.body;

    try {
        const selectedMovie = await movie.findByIdAndUpdate(id, {
            title, description,language, duration
        }, { new: true });

        return res.status(200).json({ message: "Movie updated successfully" });

    } catch (error) {
        console.log("Something went wrong in updating movie:", error);
        return res.status(500).json({ message: "Updating movie unsuccessful" });
    }
};

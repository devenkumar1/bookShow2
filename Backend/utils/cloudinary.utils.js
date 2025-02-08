import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = async (filePath) => {
    try {
        console.log("Uploading to Cloudinary:", filePath);
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "movie_posters",
        });
        console.log("Cloudinary Upload Success:", result);
        fs.unlinkSync(filePath); // Delete the local file after successful upload
        return result;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        fs.unlinkSync(filePath); // Delete the local file if upload fails
        return null;
    }
};

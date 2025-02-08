import user from "../models/user.model.js"
import movie from "../models/movie.model.js"
import show from "../models/show.model.js"
import theatre from "../models/theatre.model.js"


export const getdetails=async(req,res)=>{
    try{
        const users=await user.countDocuments();
        const movies=await movie.countDocuments();
        const theatres=await theatre.countDocuments();
        const shows=await show.countDocuments();
        res.status(200).json({users,movies,theatres,shows});
    }catch(err){
        res.status(500).json({message:"something went wrong in fetching details for admin"});
    }

}
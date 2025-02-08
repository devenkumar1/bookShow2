import theatre from "../models/theatre.model.js";

export const addTheatre=async(req,res)=>{
    const{name,location,totalSeats,contact,state,city}=req.body;
    if(!name || !location || !totalSeats || !contact ||!state||!city){
        return res.status(400).json({message:"all fields are mandatory"});
    }
    try {
        const newTheatre=await theatre.create({name,location,totalSeats,contact,state,city});
        return res.status(201).json({message:"theatre added successfully"});
    } catch (error) {
        console.log("something went wrong in adding theatre",error);
        return res.status(500).json({message:"adding theatre unsuccessful"});
    }
        
    }


export const updateTheatre=async(req,res)=>{
    const {id}=req.params;
    const {name,location,totalSeats,contact}=req.body;
    try {
        const selectedTheatre=await theatre.findByIdAndUpdate(id,{name,location,totalSeats,contact},{new:true});
        return res.status(200).json({message:"theatre updated successfully"});
    } catch (error) {
        console.log("something went wrong in updating theatre",error);
        return res.status(500).json({message:"updating theatre unsuccessful"});
    }

}
export const deleteTheatre=async(req,res)=>{
    const {id}=req.params;
    try {
        const selectedTheatre=await theatre.findByIdAndDelete(id);
        return res.status(200).json({message:"theatre deleted successfully"});
    } catch (error) {
        console.log("something went wrong in deleting theatre",error);
        return res.status(500).json({message:"deleting theatre unsuccessful"});
    }

}

export const getAllTheatre=async(req,res)=>{
    try {
        const theatres=await theatre.find();
        return res.status(200).json({theatres});

    } catch (error) {
        console.log("something went wrong in get all theatre",error);
        return res.status(500).json({message:"something went wrong"});
    }

}
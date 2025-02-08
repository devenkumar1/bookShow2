import mongoose from "mongoose";

const connectDB= async()=>{
try {
    const connectionString= process.env.MONGO_URI;
 const conn= await mongoose.connect(connectionString);
    console.log ("db connection succesfull");
 
} catch (error) {
    console.log("db connection failed",error);
}

}
export default connectDB;
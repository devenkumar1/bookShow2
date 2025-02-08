import mongoose from 'mongoose'

const citySchema=mongoose.Schema({
    id:String,
    name:String,
    state:String,
});

const City=mongoose.model('City',citySchema);
export default City;
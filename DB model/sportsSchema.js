//const mongoose = require("mongoose");

import mongoose from "mongoose"

const sportsSchema = new mongoose.Schema({
    "url":{type:String},
    "headline":{type:String},
    "source":{type:String},
    "category":{type:String}
},{
    collection:"sports"
})


//module.exports = mongoose.model("sportsSchema",sportsSchema);


export const SportsModel = mongoose.model("sportsSchema", sportsSchema);
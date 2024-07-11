//const express = require("express");
import express from "express"

//const sportsSchema = require("../DB model/sportsSchema.js");
import { SportsModel } from "../DB model/sportsSchema.js";

//const { default: mongoose } = require("mongoose");
import mongoose from 'mongoose';

const newsRoute = express.Router();

newsRoute.post("/createnews",(req,res)=>{
    SportsModel.create(req.body,(err,data)=>{
        if(err)
            return err;
        else
            res.json(data)
    })
})

newsRoute.get("/",(req,res)=>{
    SportsModel.find((err,data)=>{
        if(err)
            return err
        else
            res.json(data)
    })
})

newsRoute.route("/updatenews/:id")
.get((req,res)=>{
    SportsModel.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err)
            return err;
        else
        res.json(data);
    })

})
.put((req,res)=>{
    SportsModel.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
    {$set:req.body},
    (err,data)=>{
        if(err)
            return err
        else
            res.json(data)
    })

})
newsRoute.delete("/deletenews/:id",(req,res)=>{
    SportsModel.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id),
        (err,data)=>{
            if(err)
                return err
            else
                res.json(data)
        }
    )
})

//module.exports = newsRoute;
export default newsRoute;
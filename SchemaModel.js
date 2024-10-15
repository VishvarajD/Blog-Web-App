const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
//connecting database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_url)
        console.log(`DB Connected`);
        
    } catch (error) {
        console.log(`Error while connecting db ${error}`);
      }
      
    }
    connectDB();

const tutSchema = new mongoose.Schema({
    blogName:{
      type:String,
      required:true
    },
    blogContent:{
      type:String,
      required:true
    },
    blogImg:{
      type:String,
      required:true
    }
  })
  //created a collection by 
  const collection = new mongoose.model('collects',tutSchema)
  module.exports = collection;
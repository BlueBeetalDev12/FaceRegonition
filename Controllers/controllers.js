const express = require('express');
const connectToDB = require("../Db/conn")
const mongoose = require('mongoose');


// const collection_name = mongoose.model("User")

exports.Home = (req,res) =>{
    res.send("This is from Home route")
    console.log("This is from Home route")
}

exports.homeUpdate = (req,res) =>{
    res.send("This is from upadte route")
    console.log("This is from upadte route")
}

exports.AddUser = async(req,res,next) =>{
    let db
    try{
        db =  await connectToDB()
        const collection = mongoose.connection.collection('users');
       
      let data = {
        name : req.body.name,
        date : Date()
      }
      
      result = await collection.insertOne(data)
      res.status(201).json({success : true, message: 'User added successfully' , data : result});
      return result
    }catch (error) {
        console.log(error);
        return {status : false, message : "Failed to add User"} 
    }
   
}

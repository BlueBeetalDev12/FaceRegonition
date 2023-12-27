const express = require('express');
const http=require('http')
const connectToDB = require("../Db/conn")
const mongoose = require('mongoose');
const { default: axios } = require('axios');
const digestClient = require('http-digest-client');

const username = 'admin';
const password = 'Mwb@1234';

const httpClient = require('urllib');

const baseUrl ='http://192.168.1.52:80/ISAPI/'

// const collection_name = mongoose.model("User")

// exports.AddUser = async(req,res,next) =>{
//     let db
//     try{
//         db =  await connectToDB()
//         const collection = mongoose.connection.collection('users');
       
//       let data = {
//         name : req.body.name,
//         shiftStartTime : req.body.shiftStartTime,
//         shiftEndTime : req.body.shiftEndTime,
//         employeeId : await collection.updateOne( { $inc: { employeeId: 1 } }),
//         createdBy : 1,
//         createdDate : Date()
//       }
      
//       result = await collection.insertOne(data)
//       res.status(201).json({success : true, message: 'User added successfully' , data : result});
//       return result
//     }catch (error) {
//         console.log(error);
//         return {status : false, message : "Failed to add User"} 
//     }
   
// }

// exports.GetUser = async(req,res,next) =>{
//     let db
//     try{
//         db =  await connectToDB()
//         const collection = mongoose.connection.collection('users');
      
//       result = await collection.find().toArray()
//       res.status(201).json({success : true, message: 'User fetched successfully', data : result});
//       return result
//     }catch (error) {
//         console.log(error);
//         return {status : false, message : "Failed to add User"} 
//     }
   
// }

exports.DeviceId = async (request, response, next) => {
    const url = `${baseUrl}ContentMgmt/DeviceMgmt/deviceList?format=json`;
    // const searchID = 'C7E71364-4560-0001-6EDD-16ED17B01CCD';

    const bodyData = {
        "SearchDescription": {
            "position": 0,
            "maxResult": 100,
            "Filter": request.body.Filter
        }
    }

const options = {
  method: 'POST',
  rejectUnauthorized: false,

  // auth: "username:password" use it if you want simple auth
  digestAuth: "admin:Mwb@1234",
//   content: "Hello world. Data can be json or xml.",
  headers: {
     //'Content-Type': 'application/xml'  use it if payload is xml
     'Content-Type': 'application/json'
    // 'Content-Type': 'application/text'
  },
  data:bodyData
};
const responseHandler = (err, data, res) => {
  if (err) {
    console.log(err);
  }
//    
}
httpClient.request(url, options, responseHandler).then(res=>{

    const data=JSON.parse(res.data)

 const devIndex = data.SearchResult.MatchList[0].Device.devIndex
 request.body.devIndex = devIndex
 console.log(devIndex)
  return next()

 response.status(200).json({ success: true, message: "Device Id Fetched",data:devIndex });
}).catch(err=>{
    response.status(500).json({ success: false, message: "Failed to fetch Device Id",data:err });
})

}
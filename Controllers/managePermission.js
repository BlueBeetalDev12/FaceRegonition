const express = require('express');
const http=require('http')
const connectToDB = require("../Db/conn")
const mongoose = require('mongoose');
const { default: axios } = require('axios');
const digestClient = require('http-digest-client');

const username = 'admin';
const password = 'Mwb@1234';

const httpClient = require('urllib');
// const digest = new http.Digest({
//     username: username,
//     password: password,
//     // realm: realm,
//   });
  
const uuid ='93DE5C3C-73B3-4C88-A2F5-DB0BB4CD73CE'
const baseUrl ='http://192.168.1.52:80/ISAPI/'
const formatDate = (date) => date.toISOString().slice(0, 19).replace('T', ' ');
const client=digestClient(username,password)


exports.AddUser = async (request, response, next) => {
    try {
        // const currentDate = new Date();
        const uuid = request.body.devIndex 
        let body = request.body
      //  body.UserInfo[0].Valid.beginTime = new Date(body.UserInfo[0].Valid.beginTime)

        // const endDate = new Date(currentDate);
        // endDate.setFullYear(endDate.getFullYear() + 10);
        // body.UserInfo[0].Valid.endTime = new Date(body.UserInfo[0].Valid.endTime)

        const url = `${baseUrl}AccessControl/UserInfo/Record?format=json&devIndex=${uuid}`;
        const bodyData = {
          "UserInfo": {
              "employeeNo": 3,
              "name": "test person3",
              "Valid": {
                  "beginTime": "2017-01-01T00:00:00",
                  "endTime": "2027-12-31T23:59:59"
              }
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
            console.log(res.statusCode);
            console.log(res.headers);
            console.log(data.toString('utf8'));
          }
      httpClient.request(url, options, responseHandler)
        .then(res => {
          try {
            const data = JSON.parse(res.data);

            // Check if the response structure is as expected
            if (data && typeof data === 'object') {
              // Assuming there's an 'errorCode' property in the response
              if (data.errorCode) {
                // Handle specific error codes
                switch (data.errorCode) {
                  case 1073741834:
                    response.status(400).json({ success: false, message: data.errorMsg, errorCode: data.errorCode });
                    break;
                  // Add more cases as needed
                  default:
                    response.status(500).json({ success: false, message: "Unhandled error", errorCode: data.errorCode });
                    break;
                }
              } else {
                response.status(200).json({ success: true, message: "User Added Successfully", data: data });
              }
            } else {
              response.status(500).json({ success: false, message: "Invalid response structure", data: null });
            }
          } catch (parseError) {
            // Handle JSON parsing errors
            response.status(500).json({ success: false, message: "Failed to parse JSON", data: null, error: parseError.message });
          }
        })
        .catch(err => {
          // Handle network errors or other issues
          response.status(500).json({ success: false, message: "Failed to Add user", data: null, error: err.message });
        });

    } catch (error) {
        console.error(error);
        response.status(500).json({ success: false, message : error});
    }
};

exports.UpdateUser = async (request, response, next) => {
  const uuid = request.body.devIndex // Replace with your actual UUID

  const url = `${baseUrl}AccessControl/UserInfo/Modify?format=json&devIndex=${uuid}`;
  // const searchID = 'C7E71364-4560-0001-6EDD-16ED17B01CCD';

  const bodyData = {
    "UserInfo": {
        "employeeNo": request.body.employeeNo,
        "name": request.body.name,
        "Valid": {
            "beginTime": request.body.beginTime,
            "endTime": request.body.endTime
        }
    }
}


const options = {
method: 'PUT',
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
}
httpClient.request(url, options, responseHandler).then(res=>{

  const data=JSON.parse(res.data)

//  console.log(data.UserInfoSearch)
response.status(200).json({ success: true, message: "User Upadted Susccessfully",data:data });
}).catch(err=>{
  response.status(500).json({ success: false, message: "Failed to update User",data:err });
})

}

exports.UserList = async (request, response, next) => {
    const uuid = request.body.devIndex // Replace with your actual UUID
    const username = 'admin'; // Replace with your actual username
    const password = 'Mwb@1234'; // Replace with your actual password

    const url = `${baseUrl}AccessControl/UserInfo/Search?format=json&devIndex=${uuid}`;
    const searchID = 'C7E71364-4560-0001-6EDD-16ED17B01CCD';

    const bodyData = {
        "UserInfoSearchCond": {
            "searchID": searchID,
            "searchResultPosition": 0,
            "maxResults": 100
        }
    };


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
  // console.log(res.statusCode);
  // console.log(res.headers);
  // console.log(data.toString('utf8'));
}
httpClient.request(url, options, responseHandler).then(res=>{

    const data=JSON.parse(res.data)

//  console.log(data.UserInfoSearch)
 response.status(200).json({ success: true, message: "User List Fetched",data:data });
}).catch(err=>{
    response.status(500).json({ success: false, message: "Failed to fetch User List",data:err });
})

}


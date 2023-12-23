const mongoose = require('mongoose')

// let uri = "mongodb://localhost:27017"


async function connectToDB() {
    try {
       await mongoose.connect("mongodb://localhost:27017/FaceRecognition")
        .then(() => console.log("Connection Successful"))
        .catch((err)=> console.log(err))
    } catch (error) {
      console.error('Failed to connect to the database:', error)
      throw error
    }
  }

module.exports = connectToDB

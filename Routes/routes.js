const express = require('express')
const app  = express.Router()
const router = express.Router()
const {Home,homeUpdate,AddUser} = require("../Controllers/controllers")

router.get('/',Home)

router.post('/AddUser',AddUser)

router.put('/homeUpdate',homeUpdate)

 
module.exports = router

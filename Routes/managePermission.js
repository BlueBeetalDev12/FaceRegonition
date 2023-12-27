const express = require('express')
const app  = express.Router()
const router = express.Router()
const {AddUser, UserList, UpdateUser} = require('../Controllers/managePermission')
const{DeviceId} = require('../Controllers/device')

// router.post('/getDeviceId', DeviceId)
router.post('/AddUser',DeviceId,AddUser)
router.put('/UpdateUser',DeviceId, UpdateUser)
router.post('/UserList',DeviceId,UserList)

module.exports = router
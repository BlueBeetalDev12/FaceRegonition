const express  = require('express')
const app = express();
const device = require("./Routes/device")
const cors = require('cors')
const managePermission = require('./Routes/managePermission')
const config = require("./Db/conn")

app.use(express.json())
app.use(cors())

app.use('/',device)
app.use('/',managePermission)
// app.use('/AddUser',routes)


const Port = 8000
app.listen(Port,()=>{
    console.log(`************************** Server is running on : ${Port} **********************************`);
})

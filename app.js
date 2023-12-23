const express  = require('express')
const app = express();
const routes = require("./Routes/routes")
const config = require("./Db/conn")

app.use(express.json())


app.use('/',routes)
// app.use('/AddUser',routes)


const Port = 8000
app.listen(Port,()=>{
    console.log(`************************** Server is running on : ${Port} **********************************`);
})

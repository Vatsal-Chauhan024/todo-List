const mongoose = require("mongoose")

const connect = mongoose.connect("mongodb://localhost:27017/todos").then(()=>{
    console.log("Connection is Established Successfully")
}).catch((error)=>{
   console.log(`Connect is Not Established.... ${error}`, error) 
})

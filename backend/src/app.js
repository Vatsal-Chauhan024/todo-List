require("./db/connect")
const express = require("express");
const {addUser, getAllUsers, updateUser, deleteUser} = require("./controllers/controller");
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000


app.post("/", addUser);

app.get("/todo", getAllUsers);

app.patch("/todo", updateUser);

app.delete("/todo", deleteUser);


app.listen(port, ()=>{
    console.log(`The Backend is running on the port: ${port}`)
})
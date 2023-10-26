const todoModel = require("../models/userSchema")

const addUser = async(req, res)=>{
    const {inputWork, inputCreateDate, inputEndDate} = req.body

    const dataReceived = ({
        inputWork: inputWork,
        inputCreateDate: inputCreateDate,
        inputEndDate: inputEndDate
    })

    await todoModel.insertMany([dataReceived]);
    res.send({message:"Added to the list"})
    

}
const getAllUsers = async(req, res)=>{
       const response =  await todoModel.find()
        res.send(response)
}

const updateUser = async(req, res)=>{
    const {inputWork, inputCreateDate, inputEndDate, _id} = req.body
    

    const dataReceived = ({
        inputWork: inputWork,
        inputCreateDate: inputCreateDate,
        inputEndDate: inputEndDate,
        _id: _id
    })

    const queryParameter = {_id: _id}


    await todoModel.findOneAndUpdate(queryParameter, dataReceived, {new: true});

    res.send({message: "Updating"})

       
}


const deleteUser = async(req, res)=>{
    const {_id} = req.body
    

    console.log(req.body)

    await todoModel.findOneAndDelete(_id);

    res.send({message: "Removed"})
}

module.exports = {addUser, getAllUsers, updateUser, deleteUser}
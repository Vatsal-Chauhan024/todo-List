const express = require("express")
const mongoose = require("mongoose")


const newSchema = new mongoose.Schema({
    inputWork: {
        type: String,
        required:true
    },
    inputCreateDate: {
        type: Date,
        required:true
    },
    inputEndDate: {
        type: Date,
        required: true
    }
})

const todoModel = new mongoose.model("todo", newSchema)

module.exports = todoModel;
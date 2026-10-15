const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

//Anslut till MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABAS).then(() => {
    console.log("Ansluten till MongoDB!");
}).catch((error) => {
    console.error("Kunde inte ansluta till databasen...");
})
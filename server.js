const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
//const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/api", authRoutes);

//Starta applikation
app.listen(port, () => {
    console.log(`Servern har startat på http://localhost:${port}`);
});
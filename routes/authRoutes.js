const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

//Anslut till MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABAS).then(() => {
    console.log("Ansluten till MongoDB!");
}).catch((error) => {
    console.error("Kunde inte ansluta till databasen...");
})

//Logga in användare
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        //Validera input
        if (!username || !password) {
            return res.status(400).json({ error: "Fel input, skriv användarnamn och lösenord!" });
        }

        //Finns användaren?
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ error: "Felaktigt användarnamn/lösenord!" });
        }

        //Kontrollera lösenordet
        const isPasswordMatch = await admin.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                error: "Felaktigt användarnamn/lösenord!"
            });
        } else {
            //Skapa JWT
            const payload = { username: username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            const response = {
                message: "Användaren loggades in!",
                token: token
            }
            res.status(200).json(response);
        }

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
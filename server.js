const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const Admin = require("./models/Admin");

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/api", authRoutes);

//Skyddad routes
app.get("/api/protected", authenticateToken, async (req, res) => {

    try {
        const admin = await Admin.findOne({
            username: req.username
        });

        if (!admin) {
            return res.status(404).json({
                message: "Admin hittades inte"
            });
        }

        res.json({
            message: `Du är inloggad som admin!`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server fel"
        });
    }
});

//Validera Token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Token

    if (token == null) {
        return res.status(401).json({ message: "Not authorized for this route - token missing!" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, admin) => {
        if (err) return res.status(403).json({ message: "Ogiltig JWT" });

        req.username = admin.username;
        next();
    });
}

//Starta applikation
app.listen(port, () => {
    console.log(`Servern har startat på http://localhost:${port}`);
});
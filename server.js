const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const Admin = require("./models/Admin");
const Product = require("./models/Products");

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/api", authRoutes);

//Skyddade routes
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

app.post("/api/products", authenticateToken, async (req, res) => {
    try {

        const { name, description, price } = req.body;

        if (!name || !description || !price) {
            return res.status(400).json({
                error: "Alla fält måste fyllas i!"
            });
        }

        const product = new Product({
            name,
            description,
            price
        });

        await product.save();

        res.status(201).json({
            message: "Produkten har lagts till!"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Serverfel"
        });
    }
});

//Hämta produkter
app.get("/api/products", async (req, res) => {
    try {

        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Serverfel"
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
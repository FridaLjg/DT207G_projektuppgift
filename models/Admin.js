const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hasha lösenord
adminSchema.pre("save", async function(next) {
    try {
        if (this.isNew || this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    } catch (error) {
        throw error;
    }
});

// Jämför lösenord
adminSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Logga in admin
adminSchema.statics.login = async function(username, password) {
    const admin = await this.findOne({ username });

    if (!admin) {
        throw new Error("Felaktigt användarnamn eller lösenord!");
    }

    const passwordMatch = await admin.comparePassword(password);

    if (!passwordMatch) {
        throw new Error("Felaktigt användarnamn eller lösenord!");
    }

    return admin;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
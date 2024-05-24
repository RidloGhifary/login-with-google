const express = require("express");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const connectMongoDb = require("./dbConfig");
const User = require("./userModel");
const client = new OAuth2Client();

require("dotenv").config();

const app = express();
const PORT = 5000;

// jwt secret — store this JWT secret in your .env file
const JWT_SECRET = process.env.JWT_SECRET;

// API for Google Authentication
app.post("/google-auth", async (req, res) => {
  const { credential, client_id } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];

    // Check if the user exists in your database
    let user = await User.findOne({ email });
    if (!user) {
      // Create a user if they do not exist
      user = await User.create({
        email,
        name: `${given_name} ${family_name}`,
        authSource: "google",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ user }, JWT_SECRET);
    res.status(200).cookie("token", token, { http: true }).json({ payload });
  } catch (err) {
    res.status(400).json({ err });
  }
});

const start = async () => {
  try {
    await connectMongoDb(process.env.MONGODB_CONNECTION_STR);
    app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();

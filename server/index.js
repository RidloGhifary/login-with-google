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
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  const redirectURL = "http://localhost:5173";

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectURL
  );

  // Generate the url that will be used for the consent dialog.
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile  openid ",
    prompt: "consent",
  });

  res.json({ url: authorizeUrl });
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

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const uri = "mongodb+srv://Jaypa92:Iamjaypa92@cluster0.ivw7cmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;"
require("dotenv").config()

const UploadRoute = require('./routes/uploadRoute');

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;

mongoose.connect(uri);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('connected to mongodb');
});

db.on('error', (err) => {
    console.log("Error connecting to MongoDB", err);
});

app.use(UploadRoute);

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
})
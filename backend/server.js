/* 
Server side using Node js and Express
Using Mongose to connect to MongoDB ATLAS
*/

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB ATLAS
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Setup Router listen to path
const currencyRouter = require("./routers/currencyRouter");
app.use("/currency", currencyRouter);

const valueRouter = require("./routers/valueRouter");
app.use("/moreValue", valueRouter);

// Setup listen port
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

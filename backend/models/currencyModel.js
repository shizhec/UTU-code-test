/*
Mongose Model
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const currencySchema = new Schema({
  Currency: String,
  date: Date,
  Open: Number,
  High: Number,
  Low: Number,
  Close: Number,
  Volume: String,
  MarketCap: String,
});

const Currency = mongoose.model("Currency", currencySchema, "utu-test");

module.exports = Currency;

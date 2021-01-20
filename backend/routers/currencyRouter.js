const router = require("express").Router();
const Currency = require("../models/currencyModel");
const currencyFormatter = require("currency-formatter");

// Sort MarketCap function, sort Finance String
const sortMarketCap = (list) => {
  list.sort(function (a1, b1) {
    const a2 = currencyFormatter.unformat("$" + a1.MarketCap, { code: "USD" });
    const b2 = currencyFormatter.unformat("$" + b1.MarketCap, { code: "USD" });
    return b2 - a2;
  });
};

// API for requiring currency table data
router.route("/").get((req, res) => {
  Currency.find()
    .sort({ Date: -1 })
    .then((items) => {
      let records = [];
      let names = [];
      for (const item of items) {
        if (names.includes(item.Currency)) {
          break;
        } else {
          names.push(item.Currency);
          records.push(item);
        }
      }
      sortMarketCap(records);
      res.json(records);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

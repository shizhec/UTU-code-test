const router = require("express").Router();
let Currency = require("../models/currencyModel");

// API for requiring change difference
router.route("/:currencyName").get((req, res) => {
  const currencyName = req.params.currencyName;
  Currency.find({ Currency: currencyName })
    .sort({ Date: -1 })
    .then((info) => {
      const lastDayPrice = (info[0].High + info[0].Low) / 2;
      const secondDayPrice = (info[1].High + info[1].Low) / 2;
      const last7dPrice = (info[6].High + info[6].Low) / 2;
      const last30dPrice = (info[29].High + info[29].Low) / 2;
      const _24hDifference = (lastDayPrice - secondDayPrice) / secondDayPrice;
      const _7dDifference = (lastDayPrice - last7dPrice) / last7dPrice;
      const _30dDifference = (lastDayPrice - last30dPrice) / last30dPrice;

      res.json({
        Currency: currencyName,
        "24h": _24hDifference,
        "7d": _7dDifference,
        "30d": _30dDifference,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

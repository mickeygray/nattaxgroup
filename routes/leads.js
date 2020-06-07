const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const auth = require("../middleware/auth");

//Add Leads to Mongo

router.post("/", auth, async (req, res) => {
  try {
    const leads = await Lead.insertMany(req.body);
    res.json(leads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("servererr");
  }
});

router.put("/", auth, async (req, res) => {
  try {
    const leads = await Lead.updateMany(req.body);
    res.json(leads);
    console.log(leads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("servererr");
  }
});
//Get Leads For Email List

router.get("/", auth, async (req, res) => {
  const listConditions = JSON.parse(req.query.q);

  console.log(listConditions);
  let requestString = {};

  try {
    //new leads
    if (listConditions.isContacted === false) {
      const leads = await Lead.find({ contacts: { $eq: 0 } });
      res.json(leads);
    }

    //all leads
    else if (
      listConditions.isContacted === true &&
      listConditions.isClient === false
    ) {
      const leads = await Lead.find({
        contacts: { $gte: 1 },
        converted: false,
      });
      res.json(leads);

      //all federal
    } else if (
      listConditions.isContacted === true &&
      listConditions.isClient === false &&
      listConditions.isFederal === true
    ) {
      const leads = await Lead.find({
        contacts: { $gte: 1 },

        converted: false,
        type: /Federal/,
      });
      res.json(leads);

      //all state
    } else if (
      listConditions.isContacted === true &&
      listConditions.isClient === false &&
      listConditions.isState === true
    ) {
      const leads = await Lead.find({
        contacts: { $gte: 1 },

        converted: false,
        type: /State/,
      });
      res.json(leads);

      //all federal above 25000
    } else if (
      listConditions.isContacted === true &&
      listConditions.isClient === false &&
      listConditions.isFederal === true &&
      listConditions.isAbove25000 === true
    ) {
      const leads = await Lead.find({
        contacts: { $gte: 1 },

        converted: false,
        type: /Federal/,
        amount: { $gte: 25000 },
      });
      res.json(leads);

      //all federal below 25000
    } else if (
      listConditions.isContacted === true &&
      listConditions.isClient === false &&
      listConditions.isFederal === true &&
      listConditions.isBelow25000 === true
    ) {
      const leads = await Lead.find({
        contacts: { $gte: 1 },
        converted: false,
        type: /Federal/,
        amount: { $lte: 25000 },
      });
      res.json(leads);
    }
    //all state above 25000
    else if (
      listConditions.isContacted === true &&
      listConditions.isClient === false &&
      listConditions.isState === true &&
      listConditions.isAbove25000 === true
    ) {
      const leads = await Lead.find({
        contacts: { $gte: 1 },
        converted: false,
        type: /State/,
        amount: { $gte: 25000 },
      });
      res.json(leads);

      //all state below 25000
    } else if (
      listConditions.isContacted === true &&
      listConditions.isClient === false &&
      listConditions.isState === true &&
      listConditions.isBelow25000 === true
    ) {
      const leads = await Lead.find({
        contacts: { $gte: 1 },
        converted: false,
        type: /State/,
        amount: { $lte: 25000 },
      });
      res.json(leads);

      //all clients
    } else if (listConditions.isClient === true) {
      const leads = await Lead.find({
        converted: true,
      });
      res.json(leads);

      //all upsellable clients
    } else if (
      listConditions.isClient === true &&
      listConditions.isUpsellable === true
    ) {
      const leads = await Lead.find({
        converted: true,
        upsellable: true,
      });
      res.json(leads);

      //been mailed and interacted all leads federal
    } else if (
      listConditions.isClient === true &&
      listConditions.isUpsellable === true &&
      listConditions.isHighDollar === true
    ) {
      const leads = await Lead.find({
        converted: true,
        upsellable: true,
        highdollar: true,
      });
      res.json(leads);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Update contact status

router.put("/", (req, res) => {});

module.exports = router;

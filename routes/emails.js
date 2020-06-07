const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Email = require("../models/Email");
const Campaign = require("../models/Campaign");
const auth = require("../middleware/auth");

// @route    POST api/emails
// @desc     Register user
// @access   Public

//create new email
router.post("/templates", async (req, res) => {
  const { title, reactString, html, text, subject, from, key } = req.body;
  const newEmail = new Email({
    title,
    reactString,
    html,
    text,
    subject,
    from,
    key,
  });

  const email = await newEmail.save();

  res.json(email);
});

router.post("/campaigns", async (req, res) => {
  const {
    title,
    html,
    text,
    subject,
    from,
    bcc,
    vars,
    campaignName,
  } = req.body;

  console.log(req.body);
  const newCampaign = new Campaign({
    title,
    html,
    text,
    subject,
    from,
    bcc,
    vars,
    campaignName,
  });

  const campaign = await newCampaign.save();

  res.json(campaign);
});

//get email by title

router.get("/templates", async (req, res) => {
  try {
    const regex = new RegExp(`${req.query.q}`, "gi");
    const emails = await Email.find({
      $or: [
        { title: regex },
        { subject: regex },
        { from: regex },
        { campaignName: regex },
      ],
    });
    res.json(emails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/campaigns/:id", auth, async (req, res) => {
  const { html, title, text, subject, from, bcc, vars } = req.body;
  //  Build contact object
  const campaignFields = {};
  if (title) campaignFields.title = title;
  if (html) campaignFields.html = html;
  if (text) campaignFields.phone = text;
  if (subject) campaignFields.subject = subject;
  if (from) campaignFields.from = from;
  if (bcc) campaignFields.bcc = bcc;
  if (vars) campaignFields.vars = vars;
  try {
    let campaign = await Campaign.findById(req.params.id);

    if (!campaign) return res.status(404).json({ msg: "Campaign not found" });

    // Make sure user owns contact

    campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { $set: campaignFields },
      { new: true }
    );

    res.json(campaign);
    res.send(console.log("NIGGERS"));
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

router.get("/campaigns", async (req, res) => {
  try {
    const regex = new RegExp(`${req.query.q}`, "gi");
    const emails = await Email.find({
      $or: [
        { title: regex },
        { subject: regex },
        { from: regex },
        { campaignName: regex },
      ],
    });
    res.json(emails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { title, html, text, subject, from, bcc, vars } = req.body;

  ("use strict");

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "blackballedproductions@gmail.com",
        pass: "QW12as34!@#$", // naturally, replace both with your real credentials or an application-specific password
      },
    });

    const mailOptions = {
      text: text,
      title: title,
      from: from,
      bcc: bcc,
      subject: subject,
      html: html,
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send(console.log("....?"));
  }

  main().catch(console.error);
});

module.exports = router;

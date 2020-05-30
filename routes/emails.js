const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Email = require("../models/Email");

// @route    POST api/emails
// @desc     Register user
// @access   Public

router.post("/", (req, res) => {
  const { from, subject, html, text, leads, dateSent } = req.body;

  const email = new Email({
    from,
    subject,
    html,
    text,
    bcc,
    dateSent: Date.now(),
  });

  ("use strict");

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "Mailserver",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: req.user.email,
        pass: req.user.password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: email.from, // sender address
      bcc: leads, // list of receivers
      subject: email.subject, // Subject line
      text: email.text, // plain text body
      html: email.html,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send(console.log("....?"));
  }

  main().catch(console.error);
});

module.exports = router;

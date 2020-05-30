const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const app = express();

connectDB();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//bodyparser

app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

app.use("api/users", require("./routes/users"));
app.use("api/auth", require("./routes/auth"));
app.use("api/emails", require("./routes/emails"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

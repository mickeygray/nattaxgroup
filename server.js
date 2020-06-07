const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const app = express();
const path = require("path");

connectDB();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//bodyparser

app.use(express.json({ extended: false }));
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));
app.use(express.static(__dirname + "/public"));

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/emails", require("./routes/emails"));
app.use("/api/leads", require("./routes/leads"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const multer = require("multer");
const forms = multer();

const port = 8000;

/* For parsing data passed in body */
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(forms.array());

app.use("/", routes);

app.use(express.static(path.join(__dirname, "../", "/dist")));

/* This will be placed at the end to serve any route which was not found on server to try to find that route on frontend (client side routing) */
app.use((_, res, next) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

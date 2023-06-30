const mongoose = require("mongoose");
const { user, password } = require("./dbDetails");

mongoose.connect(
  `mongodb+srv://${user}:${password}@cluster0.l1h3i4v.mongodb.net/?retryWrites=true&w=majority`
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connecting to db"));

db.once("open", function () {
  console.log("successfully connected to the database");
});

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },

    hash: {
      type: String,
      require: true,
    },

    salt: {
      type: String,
      require: true,
    },

    surveyScore: [
      {
        score: Number,
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator, { message: "Is already taken" });

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

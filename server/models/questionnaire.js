const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const questionnaireSchema = new mongoose.Schema(
  {
    question_text: {
      type: String,
      require: true,
    },

    options: [
      {
        option_text: String,
        score: Number,
      },
    ],
  },
  { timestamps: true }
);

questionnaireSchema.plugin(uniqueValidator, {
  message: "Question Already exists",
});

const questionnaireModel = mongoose.model("questionnaire", questionnaireSchema);

module.exports = questionnaireModel;

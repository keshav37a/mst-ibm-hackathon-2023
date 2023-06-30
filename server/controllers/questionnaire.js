const QuestionnaireModel = require("../models/questionnaire");

module.exports.getQuestionnaires = async function (req, res) {
  try {
    const questionnaireList = await QuestionnaireModel.find({});

    return res.status(200).json({
      questionnaire: questionnaireList,
    });
  } catch (err) {
    return res.status(500).json({
      error: {
        data: err,
        message: "Server error",
      },
    });
  }
};

module.exports.addQuestionnaire = async function (req, res) {
  try {
    const question_text = req.body.question_text;
    const options = req.body.options;
    console.log(req.body);

    // const existingQuestion = await QuestionnaireModel.find({ question });

    // if (existingQuestion.length > 0 || existingQuestion.question) {
    //   return res.status(401).json({
    //     message: "Question already exists",
    //   });
    // }

    const questionnaireObj = await QuestionnaireModel.create({
      question_text: question_text,
      options: options,
    });

    return res.status(200).json({
      questionnaire: questionnaireObj,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: {
        data: err,
        message: "Server error",
      },
    });
  }
};

module.exports.deleteQuestionnaire = async function (req, res) {
  try {
    const question = req.body.question;
    console.log(question);
    const data = await QuestionnaireModel.findOneAndDelete({ question });
    console.log(data);
    return res.status(200).json({
      questionnaire: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: {
        data: err,
        message: "Server error",
      },
    });
  }
};

module.exports.deleteQuestionnaireById = async function (req, res) {
  try {
    const questionId = req.params.id;
    const data = await QuestionnaireModel.findByIdAndDelete(questionId);
    return res.status(200).json({
      questionnaire: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: {
        data: err,
        message: "Server error",
      },
    });
  }
};

module.exports.deleteAllQuestionnaires = async function (req, res) {
  try {
    const data = await QuestionnaireModel.deleteMany();
    return res.status(200).json({
      questionnaire: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: {
        data: err,
        message: "Server error",
      },
    });
  }
};

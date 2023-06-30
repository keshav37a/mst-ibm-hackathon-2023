const express = require("express");
const router = express.Router();
const questionnaireController = require("../../../controllers/questionnaire");

router.get("/all", questionnaireController.getQuestionnaires);
router.post("/add", questionnaireController.addQuestionnaire);
router.delete("/delete", questionnaireController.deleteQuestionnaire);
router.delete("/delete/:id", questionnaireController.deleteQuestionnaireById);
router.delete("/delete/all", questionnaireController.deleteAllQuestionnaires);

module.exports = router;

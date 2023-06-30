const express = require("express");
const router = express.Router();

const userController = require("../../../controllers/user");

router.get("/all", userController.getAllUsersInfo);
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/get-user-info", userController.getUserInfo);
router.delete("/delete", userController.deleteUser);
router.post("/add-survey-score/:id", userController.addSurveyScore);

module.exports = router;

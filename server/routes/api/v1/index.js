const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/questionnaire", require("./questionnaire"));
router.use("/mailer", require("./mailer"));
router.use("/games", require("./games"));

module.exports = router;

const transport = require("../config/nodeMailer").transport;
const FROM_EMAIL = require("../config/nodeMailer").FROM_EMAIL;
const generateHtmlTemplate =
  require("../config/nodeMailer").generateHtmlTemplate;

module.exports.sendMail = (req, res) => {
  try {
    const user = req.body.user;
    let managerEmail = req.body.email;

    if (!managerEmail) {
      /* Temporarily added to test feature */
      managerEmail = FROM_EMAIL;
    }

    const mailOptions = {
      from: FROM_EMAIL,
      to: "testforemail37a@gmail.com",
      subject: "Action Required",
      html: generateHtmlTemplate({ user, manager: managerEmail }),
    };
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: {
            data: error,
            message: "Server error",
          },
        });
      }
      return res.status(500).json({
        error: {
          data: info.response,
          message: "Message sent",
        },
      });
    });
  } catch (e) {
    return res.status(500).json({
      error: {
        data: e,
        message: "Server error",
      },
    });
  }
};

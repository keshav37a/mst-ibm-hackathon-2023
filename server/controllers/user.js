const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const db = require("../config/mongoose");
const UserModel = require("../models/user");
const secret = require("../config/secret");

module.exports.getAllUsersInfo = async function (req, res) {
  try {
    const userList = await UserModel.find({});
    return res.status(200).json({
      user: userList,
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

module.exports.signup = async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const salt = await crypto.randomBytes(16).toString("hex");
    const hash = await crypto
      .pbkdf2Sync(password, salt, 10000, 512, "sha512")
      .toString("hex");

    const userObj = await UserModel.create({
      username: email,
      email: email,
      salt: salt,
      hash: hash,
    });

    const token = generateJwt(userObj);

    return res.status(200).json({
      _id: userObj._id,
      email: userObj.email,
      token: token,
      surveyScore: userObj.surveyScore,
      createdAt: userObj.createdAt,
      updatedAt: userObj.updatedAt,
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

const generateJwt = function (user) {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 7);

  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      exp: parseInt(exp.getTime() / 1000),
    },
    secret
  );
};

module.exports.signin = async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userObj = await UserModel.findOne({ email });

    if (!email) {
      return res.status(500).json({
        error: {
          message: "Please enter email",
        },
      });
    }

    if (!password) {
      return res.status(500).json({
        error: {
          message: "Please enter password",
        },
      });
    }

    if (userObj) {
      const salt = userObj.salt;
      const hash = crypto
        .pbkdf2Sync(password, salt, 10000, 512, "sha512")
        .toString("hex");
      if (userObj.hash === hash) {
        const token = generateJwt(userObj);
        return res.status(200).json({
          _id: userObj._id,
          email: userObj.email,
          token: token,
          surveyScore: userObj.surveyScore,
        });
      } else {
        return res.status(401).json({
          error: {
            message: "Wrong credentials",
            validated: false,
          },
        });
      }
    } else {
      return res.status(404).json({
        error: {
          message: "User not found",
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: {
        message: "Server error",
        data: err,
      },
    });
  }
};

module.exports.getUserInfo = async function (req, res) {
  try {
    const email = req.body.email;
    const userObj = await UserModel.findOne({ email });
    const token = generateJwt(userObj);
    if (userObj) {
      return res.status(200).json({
        _id: userObj._id,
        email: userObj.email,
        surveyScore: userObj.surveyScore,
        token: token,
      });
    }
  } catch (e) {}
};

module.exports.deleteUser = async function (req, res) {
  try {
    const email = req.body.email;
    const userObj = await UserModel.findOne({ email });
    if (userObj) {
      const user = await UserModel.deleteOne({ email });
      return res.status(200).json({
        user: user,
        message: "Successfully deleted",
      });
    } else {
      return res.status(404).json({
        error: {
          message: "User not found",
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: {
        message: "Server error",
        data: err,
      },
    });
  }
};

module.exports.addSurveyScore = async function (req, res) {
  const userId = req.params.id;
  const score = req.body.score;
  const date = req.body.date;

  if (!userId) {
    return res.status(404).json({
      error: {
        message: "User id cannot be empty",
        data: null,
      },
    });
  }

  if (score != 0 && !score) {
    return res.status(404).json({
      error: {
        message: "Score cant be empty",
        data: null,
      },
    });
  }

  if (!date) {
    return res.status(404).json({
      error: {
        message: "Score cant be empty",
        data: null,
      },
    });
  }

  let userObj = await UserModel.findById(userId);

  if (!userObj) {
    return res.status(404).json({
      error: {
        message: "User not found. Please check the user id",
        data: null,
      },
    });
  }

  const updatedUser = await UserModel.updateOne(
    { _id: userId },
    {
      $push: {
        surveyScore: {
          date,
          score,
        },
      },
    }
  );

  userObj = await UserModel.findById(userId);

  return res.status(200).json({
    message: "Score added",
    data: {
      user: userObj,
      update: updatedUser,
    },
  });
};

const nodemailer = require("nodemailer");

const FROM_EMAIL = "testforemail37a@gmail.com";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: FROM_EMAIL,
    pass: "ldyddksnllrkckoo",
  },
});

const generateHtmlTemplate2 = ({ user, manager }) => {
  return `
    <div>
        <div style="font-size:20px; color: red;">Your Attention Please</div>
        <div>
            You have a great team/team members, currently your team/team members need more attention, please have a look at below MMT results
        </div>
        <img height="400px" src="https://i.ibb.co/LRxC4jv/image-4.png" />
        <div>
            <div>Thanks and Best Regards<div>
            <br></br>
            <div>Team IBM<div>
            <br></br>
            <div>Always there to support you</div>
        </div>
    </div>    
    `;
};

const generateHtmlTemplate = ({ user, manager }) => {
  return `
        <div>
            <div>Dear ${manager},</div>
            <br></br>
            <div>
                We have noticed that in the last 3 mental health surveys taken by ${user} depicted a negative outlook for him / her.
                We request you to kindly schedule a one on one session with the said person and if needed get a counselling session scheduled at the earliest.
            </div>
            <br></br>
            <div>
                Thanks and Best Regards
            </div>
            <div>
                Yours sincerely
            </div>
            <div>
                HR Team
            </div>
        </div>
    `;
};

module.exports = {
  transport,
  FROM_EMAIL: FROM_EMAIL,
  generateHtmlTemplate: generateHtmlTemplate2,
};

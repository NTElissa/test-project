const nodemailer = require("nodemailer");
const mailgen = require('mailgen'); 
const { EMAIL, PASSWORD } = require('../env.js')

// send email for test account
const signup = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  let message = {
    from: 'fred foo',
    to: 'elissa@gmail.com',
    subject: 'hello ',
    test: 'hello , elissa how are you',
    html: '<b> Hello world ?</b>'
  }
  transporter.sendMail(message).then((info) => {
    return res.status(201)
      .json({
        msg: "you should receive an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info)
      })
  }).catch(error => {
    return res.status(500).json([error])
  })
};

// send mail from real gmail account
const getbill = (req, res) => {

  const { userEmail } = req.body;
  let config = {
    service: 'gmail',
    user: EMAIL,
    pass: PASSWORD
  }
  let transporter = nodemailer.createTransport(config);
  let MailGenerator = new mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: 'https://Mailgen.js/' // Correct the typo here
    }
  });
  let response = {
    body: {
      name: "elissantihinduka",
      intro: "your bill has arrived !",
      table: {
        data: [{
          item: " nodemailer stack book",
          description: "a backend application ",
          price: "$10.99",
        }]
      },
      outro: "Looking forward to do more business"
    }
  }

  let mail = MailGenerator.generate(response)

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "place Order",
    html: mail
  }
  transporter.sendMail(message).then(() => {
    return res.status(201).json({
      msg: "you should receive an email"
    })
  }).catch(error => {
    return res.status(500).json({ error })
  })
}

module.exports = {
  signup,
  getbill,
};

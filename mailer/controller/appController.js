const nodemailer = require("nodemailer");
const {EMAIL ,PASSWORD } =require('../env.js')

// send email for test account 
const signup = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  let message ={
    from:'fred foo',
    to:' elissa@gmail.com',
    subject:'hello ',
    test:'hello , elissa how are you',
    html:'<b> Hello world ?</b>'
  }
 transporter.sendMail(message).then ( (info)=>{
  return res.status (201)
  .json({ msg:"you should receive an email",
          info:info.messageId,
          preview:nodemailer.getTestMessageUrl(info)
})
 }).catch(error=>{
  return res.status(500).json([error])
 })

  // res.status(201).json("signup successfully... !");
};

// send mail from real gmail account 
const getbill = (req, res) => {
  let config ={
    service:'gmail',
    user:EMAIL,
    pass:PASSWORD
  }
  res.status(201).json("getbill successfully... !");
}; 

module.exports = {
  signup,
  getbill,
};

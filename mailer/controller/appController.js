const nodemailer = require("nodemailer");
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
    to:'bar@example.com , elissa@gmail.com',
    subject:'hello ',
    test:'hello world?',
    html:'<b> Hello world ?</b>'
  }
 transporter.sendMail(message).then ( ()=>{
  return res.status (201).json({ msg:"you should receive an email"})
 }).catch(error=>{
  return res.status(500).json([error])
 })

  // res.status(201).json("signup successfully... !");
};
const getbill = (req, res) => {
  res.status(201).json("getbill successfully... !");
}; 

module.exports = {
  signup,
  getbill,
};

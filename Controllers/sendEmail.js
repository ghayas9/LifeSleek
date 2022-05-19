const nodemailer = require('nodemailer')

const sendEmail =(txt)=>{
  var name = 'ghayas';
  var from = 'ghayasudin999@gmail.com';
  var message = `Your OTP : ${txt}`;
  var to = 'ghayas9090@gmail.com';
  var smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
          user: "ghayasudin999@gmail.com",
          pass: ""
      }
  });
  var mailOptions = {
      from: from,
      to: to, 
      subject: name+' | new message !',
      text: message
  }
  smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
      }else{
          console.log(response)
      }
  });
}
module.exports ={sendEmail}
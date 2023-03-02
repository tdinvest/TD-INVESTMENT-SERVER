const User = require("../models/user");
const nodemailer = require("nodemailer");

exports.verify = (req, res, next) => {
  const username = req.body.username;
  let loadedUser;
  let number = (Math.random() + 1).toString(36).substring(7);
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        const error = new Error(
          "A user with this username could not be found."
        );
        error.statusCode = 401;
        throw error;
      }

      loadedUser = user;
      console.log(user.email);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "richardgraythom@gmail.com",
          pass: "bxdwqokvgzqyqyst",
        },
      });

      const SENDMAIL = async (mailDetails, callback) => {
        try {
          const info = await transporter.sendMail(mailDetails);
          callback(info);
        } catch (error) {
          console.log(error);
        }
      };

      const message = `Please do not diclose this code`;
      const options = {
        from: "richardgraythom@gmail.com", // sender address
        to: "richardgraythom@gmail.com", // receiver email
        subject: "SENT FROM TD-INVESTMENT-BANK", // Subject line
        text: message,
        html: `Hello your verification code is ${number}`,
      };

      SENDMAIL(options, (info) => {
        console.log("Email sent successfully");
        console.log(user.email);
        console.log("MESSAGE ID: ", info.messageId);

        User.findOne({ email: user.email }).then((userM) => {
          userM.verify = number;
          userM.save();
          res.status(200).json({
            status: "Sent",
          });
          //return user.password;
          //bcrypt.compare(password, user.password);
        });
      });

      //return user.password;
      //bcrypt.compare(password, user.password);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deposit = (req, res, next) => {
  const username = req.body.username;
  const amount = req.body.amount;

  console.log("reached");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "richardgraythom@gmail.com",
      pass: "bxdwqokvgzqyqyst",
    },
  });

  const SENDMAIL = async (mailDetails, callback) => {
    try {
      const info = await transporter.sendMail(mailDetails);
      callback(info);
    } catch (error) {
      console.log(error);
    }
  };

  const message = `Please do not diclose this code`;
  const options = {
    from: "richardgraythom@gmail.com", // sender address
    to: "richardgraythom@gmail.com", // receiver email
    subject: "IMPORTANT MESSAGE FROM USER", // Subject line
    text: message,
    html: `Hello user ${username} requested for a deposit ${amount}`,
  };

  SENDMAIL(options, (info) => {
    console.log("Email sent successfully");
    console.log("MESSAGE ID: ", info.messageId);
    res.status(200).json({
      status: "Sent",
    });
  });
};

exports.transfer = (req, res, next) => {
  const username = req.body.username;
  const amount = req.body.amount;
  const account = req.body.accountno;
  const bankname = req.body.bankname;

  console.log(amount);
  console.log(bankname);
  console.log(username);
  console.log(account);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "richardgraythom@gmail.com",
      pass: "bxdwqokvgzqyqyst",
    },
  });

  const SENDMAIL = async (mailDetails, callback) => {
    try {
      const info = await transporter.sendMail(mailDetails);
      callback(info);
    } catch (error) {
      console.log(error);
    }
  };

  const message = `Please do not diclose this code`;
  const options = {
    from: "richardgraythom@gmail.com", // sender address
    to: "richardgraythom@gmail.com", // receiver email
    subject: "IMPORTANT MESSAGE FROM USER", // Subject line
    text: message,
    html: `Hello user ${username} requested for a transfer amount of ${amount} to Account no ${account} 
          Bank Name: ${bankname}
          `,
  };

  SENDMAIL(options, (info) => {
    console.log("Email sent successfully");
    console.log("MESSAGE ID: ", info.messageId);
    res.status(200).json({
      status: "Sent",
    });
  });
};


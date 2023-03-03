const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


const User = require('../models/user');



exports.signup = (req, res, next) => {
  
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    console.log("My Printing OK chexk it");
  console.log(errors);
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  
  
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const username = req.body.username;
  const accountNo = req.body.accountNo;
 

  
      
      User.findOne({ username: username })
    .then(user => {
      if (user) {   
      res.status(201).json({ message: 'Username Taken'});
        const error = new Error('UserName Taken');
        error.statusCode = 401;
        throw error;
      } else {
        const user = new User({
          email: email,
          password: password,
          name: name,
          username: username,
          accountNo: accountNo
        });    
      return user.save()
      }
      // loadedUser = user;
      // if(password === user.password) {
      //   return true
      // }
      // return false
      // //return user.password;
      // //bcrypt.compare(password, user.password);
    })
    .then(result => {
      console.log('sent');
      const msg = {
        to: 'victorkudos@gmail.com', // Change to your recipient
        from: 'lecturedocx@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
  //     sgMail
  // .send(msg)
  // .then(() => {
  //   console.log('Email sent')
  // })
  // .catch((error) => {
  //   console.error(error)
  // })
      // transporter.sendMail({
      //   to: email,
      //   from: 'victorkudos@gmail.com',
      //   subject: 'Signup succeeded!',
      //   html: '<h1>You successfully signed up!</h1>'
      // }).catch(err => {
      //   console.log(err);
      // });
      res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ username: username })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this username could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      if(password === user.password) {
        return true
      }
      return false
      //return user.password;
      //bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, 
        userId: loadedUser._id.toString(), 
        bal: loadedUser.balance,
        username: loadedUser.username,
        email: loadedUser.email,
        verify: loadedUser.verify,
        accountNo: loadedUser.accountNo
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const helmet = require('helmet');
const cors = require('cors');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const verifyRoutes = require('./routes/verify');
// const { default: helmet } = require('helmet');

const app = express();

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };



// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "victorkudos@gmail.com",
//     pass: "rczwuysfrcuveqrf",
//   },
// });


// const SENDMAIL = async (mailDetails, callback) => {
//   try {
//     const info = await transporter.sendMail(mailDetails)
//     callback(info);
//   } catch (error) {
//     console.log(error);
//   } 
// };


// const message = "Hi there, you were emailed me through nodemailer"
// const options = {
//     from: "TESTING <victor@gmail.com>", // sender address
//     to: "victorkudos@gmail.com", // receiver email
//     subject: "Send email in Node.JS with Nodemailer using Gmail account", // Subject line
//     text: message,
//     html: 'Hello',
// }



// SENDMAIL(options, (info) => {
//   console.log("Email sent successfully");
//   console.log("MESSAGE ID: ", info.messageId);
// });





// SibApiV3Sdk.ApiClient.instance.authentications['api-key'].
//  apiKey = 'xsmtpsib-4b45bf2ef63079ffb3bbc60eb782e10e866f8206ab57b4ada0907c79b0f1a0dd-UQELk1ARXf6Vc52S';
//   new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
//     {
//       'subject':'Hello from the Node SDK!',
//       'sender' : {'email':'lecturedocx@gmail.com', 'name':'Kudos'},
//       'replyTo' : {'email':'victorkudos@gmail.com', 'name':'Kudos'},
//       'to' : [{'name': 'John Doe', 'email':'victorkudos@gmail.com'}],
//       'htmlContent' : '<html><body><h1>This is a transactional email {{params.bodyMessage}}</h1></body></html>',
//       'params' : {'bodyMessage':'Made just for you!'}
//     }
//   ).then(function(data) {
//     console.log(data);
//   }, function(error) {
//     console.error(error);
//   });



app.use(bodyParser.urlencoded({extended: true})); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
// );
// app.use('/images', express.static(path.join(__dirname, 'images')));


// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET,OPTIONS,PATCH,DELETE,POST,PUT']
// }));
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET,OPTIONS,PATCH,DELETE,POST,PUT']
}));


app.use( async(req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Length'
  )
  next();
});


app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
app.use('/verify', verifyRoutes);

app.use(helmet());

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    'mongodb+srv://richardgraythom:e6qfSeXM5xXv2Nya@cluster0.sjsr1bl.mongodb.net/database?retryWrites=true&w=majority'
    //'mongodb+srv://victorkudos:t7CEjnD7yIShr1FI@cluster0.iogciqk.mongodb.net/database?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(5000);
  })
  .catch(err => console.log(err));

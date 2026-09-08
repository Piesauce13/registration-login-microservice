require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const connectDB = require('./dbconnect');
const PersonModel = require('./person_schema');
connectDB();

/*
In the postman use the following URL
localhost:5000/reg

{
  "firstname":"Joe",
  "email":"a@gmail.com",
  "password":"abc",
  "mobile": 12345678,
  "role": "student"
}

*/

function uniqueid(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

//REG API
app.post('/reg', (req, res) => {
  console.log("REG API EXECUTED")
  const pobj = new PersonModel({
    id: uniqueid(1000, 9999),
    name: req.body.firstname,
    emailid: req.body.email,
    pass: req.body.password,
    mobile: req.body.mobile,
    role: req.body.role
  });//CLOSE PersonModel
  
  //INSERT/SAVE THE RECORD/DOCUMENT
  pobj.save()
    .then(inserteddocument => {
      res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE');
    })//CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Employee Save ' })
    });//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
);//CLOSE POST METHOD

// START THE EXPRESS SERVER. 5000 is the PORT NUMBER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Registration microservice started on port ${PORT}`));
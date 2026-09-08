require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const connectDB = require('./dbconnect');
const PersonModel = require('./person_schema');
connectDB();

app.post('/login', (req, res) => {
  console.log("LOGIN API EXECUTED");
  PersonModel.findOne({ emailid: req.body.email })
    .then(user => {
      if (!user || user.pass !== req.body.password) {
        return res.status(401).send({ message: 'Invalid email or password' });
      }
      const token = jwt.sign(
        { id: user.id, email: user.emailid, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).send({ message: 'LOGIN SUCCESSFUL', token: token });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Login' });
    });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Authentication microservice started on port ${PORT}`));
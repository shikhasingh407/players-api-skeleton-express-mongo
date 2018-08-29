const Boom = require('boom');
var q = require('q');
const jwtsecret = "jwtsecrethere";
const jwt = require('jsonwebtoken');
const { Router } = require('express');

const mongoose = require('mongoose');
// const LoginSchema = new mongoose.Schema(
//   {
//     email: { type: String, required: true },
//     password: { type: String, required: true }
//   },
//   {
//     versionKey: false
//   }
// );
// const LoginModel = mongoose.model('Login', LoginSchema);
const { User } = require('../../models');
const router = new Router();

router.post('/', (req, res, next) => {
  const userObj = {'email': req.body.email, 'password': req.body.password};
  const { email, password } = req.body;
  if (!password || !email) throw Boom.conflict('Required missing');

  User.findOne(userObj, function (err, user){
    //console.log("player at find player by name: " + player);
    if(user != null){
      res.status(200).send({
        success: true,
        token: getToken(user._id),
        user});
    }
    else{
      res.status(401).send();
    }
  });
});


const getToken = user => jwt.sign({ userId: user._id }, jwtsecret);

module.exports = router;

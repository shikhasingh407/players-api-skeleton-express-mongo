const Boom = require('boom');
const jwtsecret = "jwtsecrethere";
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { User } = require('../../models');

const router = new Router();

router.post('/', (req, res, next) => {
  const { password, confirm_password } = req.body;
  if (!password || !confirm_password || password !== confirm_password) throw Boom.conflict('Passwords do not match');
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send({
        success: true,
        token: getToken(user),
        user
      });
    }).catch(next);
});

router.put('/:userId', (req, res, next) => {
  // const { password, confirm_password } = req.body;
  // if (!password || !confirm_password || password !== confirm_password) throw Boom.conflict('Passwords do not match');
  //const user = new User(req.body);
  let userid = req.params.userId;
  let body = req.body;
  const userObj = {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password
  }
  console.log("userid: " + userid + " body: " + JSON.stringify(body));
  User
    .update({"_id": userid}, userObj, function(err, user){
      if (err) {
        res.status(404).send(err);
      }
      User.findOne({"_id": userid}, function (err, user){
        res.status(200).send({ success: true, user});
      });
    });
});
const getToken = user => jwt.sign({ userId: user._id }, jwtsecret);

module.exports = router;

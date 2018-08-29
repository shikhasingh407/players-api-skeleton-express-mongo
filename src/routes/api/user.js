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
  console.log("userid: " + userid + " body: " + JSON.stringify(body));

  // user
  //   .update({"_id": userid}, { $set: body }, function(err, num){
  //       res.status(200).send(num);
  //   }

  User.findOne({_id: req.params.id}, function (err, doc) {
    res.status(200).send({success: true, doc});
    // if(doc)
    //   res.status(200).send({success: true, doc});
    // else
    //   res.status(403).send();
  });
});


const getToken = user => jwt.sign({ userId: user._id }, jwtsecret);

module.exports = router;

const Boom = require('boom');
const jwtsecret = "jwtsecrethere";
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { Player } = require('../../models');

const router = new Router();

router.post('/', (req, res, next) => {
  //const { password, confirm_password } = req.body;
  //if (!password || !confirm_password || password !== confirm_password) throw Boom.conflict('Passwords do not match');
  console.log("player: " + JSON.stringify(req.body));
  if(!req.headers.authorization || req.headers.authorization == ""){
    const err = new Error('Missing Token');
    err.status = 403;
    res.status(err.status || 403);
    res.send(err.message);
    res.status(403).send();
  }
  else {
    const player = new Player(req.body);
    player
      .save()
      .then(() => {
        res.status(201).send({
          success: true,
          //token: getToken(player),
          player
        });
      }).catch(next);
  }
});


router.get('/', (req, res, next) => {
  //const { password, confirm_password } = req.body;
  //if (!password || !confirm_password || password !== confirm_password) throw Boom.conflict('Passwords do not match');
  console.log("player: " + JSON.stringify(req.body));
  if(!req.headers.authorization || req.headers.authorization == ""){
    const err = new Error('Missing Token');
    err.status = 403;
    res.status(err.status || 403);
    res.send(err.message);
    res.status(403).send();
  }
  else {
    //const player = new Player();

    // var mongoose = require('mongoose');
    // const PlayersSchema = new mongoose.Schema(
    //   {
    //     first_name: { type: String, required: true },
    //     last_name: { type: String, required: true },
    //     rating: { type: Number, required: true },
    //     handedness: { type: String, required: true }
    //   }
    //   ,
    //   {
    //     versionKey: false
    //   }
    // );
    //
    // const player = mongoose.model('Player1', PlayersSchema);
    //
    // player
    //   .find(function (err, docs){ //THIS IS WHAT'S FAILING
    //       res.status(200).send({
    //         success: true,
    //         token: getToken("sampleId"),
    //         docs
    //       });
    //
    //   });
  }
});


const getToken = player => jwt.sign({ userId: player._id }, jwtsecret);

module.exports = router;

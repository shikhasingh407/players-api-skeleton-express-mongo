const Boom = require('boom');
var q = require('q');
const jwtsecret = "jwtsecrethere";
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const mongoose = require('mongoose');

const PlayersSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    rating: { type: Number, required: true },
    handedness: { type: String, required: true },
    id: { type: String }
  },
  {
    versionKey: false
  }
);

const PlayerModel = mongoose.model('Player', PlayersSchema);


const router = new Router();

router.post('/', (req, res, next) => {
  const playerObj = {'first_name': req.body.first_name, 'last_name': req.body.last_name, 'rating': req.body.rating, 'handedness': req.body.handedness};
  PlayerModel.create(playerObj)
    .then(() => {
      res.status(200).send({
        success: true,
        player: playerObj
      });
    }).catch(res.status(409).send());
});


const getToken = user => jwt.sign({ userId: user._id }, jwtsecret);

module.exports = router;


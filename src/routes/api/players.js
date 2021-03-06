const Boom = require('boom');
const jwtsecret = "jwtsecrethere";
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { Player } = require('../../models');

const router = new Router();

router.delete('/:id', (req, res, next) => {
  if(!req.headers.authorization || req.headers.authorization == ""){
    res.status(403).send();
  }
  else {
    Player.findOne({_id: req.params.id}).remove(function (err, doc) {
      if(doc){
        console.log("here");
        res.status(200).send({success: true, doc});
      }
      else{
        //console.log("here");
        res.status(404).send();
      }
    });
  }
});

router.post('/', (req, res, next) => {
  console.log("create player called by test cases");
  if(!req.headers.authorization || req.headers.authorization == ""){
    const err = new Error('Missing Token');
    err.status = 403;
    res.status(err.status || 403);
    res.send(err.message);
    res.status(403).send();
  }
  else {
    Player.findOne({first_name: req.body.first_name}, function (err, player){
      if(player !== null){
        res.status(409).send();
      }
      else{
        req.body.created_by = req.headers.authorization;
        const player = new Player(req.body);
        player
          .save()
          .then(() => {
            res.status(201).send({
              success: true,
              player
            });
          }).catch(next);
      }
    });
  }
});

router.get('/', (req, res, next) => {
  console.log("get players: " + JSON.stringify(req.body));
  if(!req.headers.authorization || req.headers.authorization == ""){
    const err = new Error('Missing Token');
    err.status = 403;
    res.status(err.status || 403);
    res.send(err.message);
    res.status(403).send();
  }
  else {
    Player
      .find(function (err, players){ //THIS IS WHAT'S FAILING
        res.status(200).send({
          success: true,
          players
        });

      });
  }
});

function findPlayerByName(playerName) {
  console.log(playerName);
  Player.findOne({first_name: playerName}, function (err, player){
    console.log("player at find player by name: " + player);
    return player;
  });
}

const getToken = player => jwt.sign({ playerId: player._id }, jwtsecret);

module.exports = router;

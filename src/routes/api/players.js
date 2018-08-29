const Boom = require('boom');
const jwtsecret = "jwtsecrethere";
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { Player } = require('../../models');

const router = new Router();

router.post('/:id', (req, res, next) => {
  if(!req.headers.authorization || req.headers.authorization == ""){
    //const err = new Error('Missing Token');
    //err.status = 403;
    res.status(403).send();
  }
  else {
    if(req.headers.authorization != getToken(req.params.id)){
      res.status(403).send();
    }
    else {
      Player.findOne({_id: req.params.id}).remove(function (err, doc) {
        if(doc)
          res.status(200).send({success: true, doc});
        else
          res.status(403).send();
      });
    }
  }
});

router.post('/', (req, res, next) => {
  //console.log("player: " + JSON.stringify(req.body));
  if(!req.headers.authorization || req.headers.authorization == ""){
    const err = new Error('Missing Token');
    err.status = 403;
    res.status(err.status || 403);
    res.send(err.message);
    res.status(403).send();
  }
  else {
    Player.findOne({first_name: req.body.first_name}, function (err, player){
      //console.log("player at find player by name: " + player);
      if(player !== null){
        res.status(409).send();
      }
      else{
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
  }
});


router.get('/', (req, res, next) => {
  //console.log("player: " + JSON.stringify(req.body));
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
                //token: getToken("sampleId"),
                players
              });

          });
    //const player = new Player();
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

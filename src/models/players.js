const mongoose = require('mongoose');

const PlayersSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    rating: { type: Number, required: true },
    handedness: { type: String, required: true }
  }
  ,
  {
    versionKey: false
  }
);

PlayersSchema.methods.toJSON = function() {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  return obj;
};

const Player = mongoose.model('Player', PlayersSchema);
module.exports = Player;

const mongoose = require('mongoose');
var q = require('q');

const LoginSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

LoginSchema.methods.toJSON = function() {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  return obj;
};

const LoginModel = mongoose.model('Login', LoginSchema);


function findUserByCredentials (credentials){
 // console.log("Checking in the model");
  var deferred = q.defer();
  LoginModel.findOne({email: credentials.email, password: credentials.password}, function(err, doc){
    if(err){
      deferred.reject(err);
    }
    else{
      deferred.resolve(doc);
    }
  });

  return deferred.promise;
}

module.exports = LoginModel;

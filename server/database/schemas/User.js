const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment-2');
const immutablePlugin = require('mongoose-immutable');
const bcrypt = require('bcryptjs');
const R = require('ramda');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, lowercase: true, required: true, unique: true, immutable: true },
  username_case: { type: String, required: true },
  password: { type: String, required: true },
  profile_pic: { type: String },
  first_name: { type: String, maxlength: 20 },
  last_name: { type: String, maxlength: 20 },
  bio: { type: String, maxlength: 240 },
  preferences: { type: Array},
  created_at: { type: Date, default: Date.now, immutable: true },
  updated_at: { type: Date },
  friendList: { type: String, default: undefined},
  dailyScore: {type: {type: Date, type: Number}, required: false},
  totalScore: {type: Number, default: 0},
  savedArticles: {type: {type: [Schema.Types.ObjectId], type: String}},
});

userSchema.plugin(autoIncrement, { model: 'User', field: 'user', startAt: 1 });
userSchema.plugin(immutablePlugin);

userSchema.virtual('full_name').get(function() {
  if (this.first_name && this.last_name) {
    return `${this.first_name} ${this.last_name}`;
  }
  if (this.first_name && !this.last_name) {
    return this.first_name;
  }
  if (!this.first_name && this.last_name) {
    return this.last_name;
  }
  return undefined;
});

userSchema.virtual('initials').get(function() {
  return this.first_name && this.last_name && `${this.first_name[0].concat(this.last_name[0]).toUpperCase()}`;
});

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.hashPassword = function() {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err1, salt) => {
      if (err1) { reject(err1); }
      bcrypt.hash(this.password, salt, (err2, hash) => {
        if (err2) { reject(err2); }
        this.password = hash;
        resolve(hash);
      });
    });
  });
};

userSchema.methods.hidePassword = function() {
  return R.omit(['password', '__v', '_id'], this.toObject({ virtuals: true }));
};

const User = mongoose.model('User', userSchema);

module.exports = User;

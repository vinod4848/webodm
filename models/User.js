const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['UserAdmin', 'SubAdmin', 'User'], required: true },
  profile: {
    name: String,
    address: String,
    contactNumber: String,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

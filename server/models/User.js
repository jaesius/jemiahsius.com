import bcrypt from 'bcrypt-nodejs'
import crypto from 'crypto'
import mongoose from 'mongoose'

let User = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  profile: {
    name: { type: String, default: '' },
    gender: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    emails: [{ type: String, default: '' }],
    pictures: [{ type: String, default: '' }]
  },

  resetPasswordToken: String,
  resetPasswordExpires: Date
})

// Password hash middleware.
User.pre('save', function(next) {
  var user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

// Helper method for validating user's password.
User.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err)

    cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', User)

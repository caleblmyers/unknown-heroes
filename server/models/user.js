const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: 'Email address is required',
  },
  password: {
    type: String,
    trim: true,
    required: 'A password is required',
    validate: [
      function (input) {
        return input.length >= 4
      },
      'Password should be four characters or longer'
    ]
  },
  knightLevel: {
    type: Number,
    default: 1
  },
  mageLevel: {
    type: Number,
    default: 1
  },
  thiefLevel: {
    type: Number,
    default: 1
  },
  knightExp: {
    type: Number,
    default: 0
  },
  mageExp: {
    type: Number,
    default: 0
  },
  thiefExp: {
    type: Number,
    default: 0
  }
})

class newUser {
  constructor({ id, email, password }) {
    this.id = id
    this.email = email
    this.password = password
  }

  comparePassword(challenge) {
    return this.password === challenge
  }
}

UserSchema.loadClass(newUser)
let User = mongoose.model('User', UserSchema)

module.exports = User

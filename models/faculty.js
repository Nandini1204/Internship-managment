const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  
  email: {
    type: String,
    unique: true,
  },

  token: {type: String},
  
  isStudent: {
    default: true,
    type: Boolean
  },

},{ timestamps: true });


const student = mongoose.model('User', studentSchema);
module.exports = student;
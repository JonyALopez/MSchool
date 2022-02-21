const mongoose = require('mongoose');
const User = require('./User');
const {Schema} = mongoose;

const CursoSchema = new Schema({
    title: {type: String,required: true},
    description:{type: String, required:true},
    date:{ type: Date,default: Date.now},
    user: {type: String}
});

module.exports = mongoose.model('Curso',CursoSchema);
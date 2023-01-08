// how db structure to be created..
const mongoose = require('mongoose')
//Scheme is like how our database looks like.
const TodoSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    complete:{
        type:Boolean,
        default:false
    },
    timestamp:{
        type:String,
        default:Date.now()
    }
})
//model name of the schema
const Todo = mongoose.model("Todo",TodoSchema)

module.exports = Todo
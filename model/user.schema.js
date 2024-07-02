const mongoose= require('mongoose')

const Schema = mongoose.Schema

const userSchema=new Schema({
    firstName : String ,
    lastName : String , 
    email : String ,
    age : Number
})

const User = mongoose.model('user',userSchema)

module.exports = User
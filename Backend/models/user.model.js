import {Schema,model} from "mongoose"
import mongoose from "mongoose";
const userSchema=new Schema({
    username:{
        type:String,
        unique:[true,'username already taken'],
        required:true
    },
    email:{
        type:String,
        unique:[true,"Accouny already exits with this email address"],
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["User","Admin"],
        default:"User"
    }

})
const User=model('User',userSchema)
export default User;
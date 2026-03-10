import mongoose from "mongoose"
import { Schema,model } from "mongoose"
const blacklistTokenSchema=new Schema({
    token:{
        type:String,
        required:[true,"token is required to be added in blacklist"]
    }
},{
    timestamps:true
})
const tokenBlacklistModel=model("tokenBlacklistModel",blacklistTokenSchema)
export default tokenBlacklistModel
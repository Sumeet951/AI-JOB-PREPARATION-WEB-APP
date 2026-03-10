import mongoose from "mongoose";
const connectToDB=async()=>{
    try{
        const {connection}=await mongoose.connect(
            process.env.MONGO_URL)
            if(connection){
                console.log(`connected to MongoDB:${connection.host}`)
            }
    }
    catch(err){
        console.log(error);
        process.exit(1);
    }
}
export default connectToDB;
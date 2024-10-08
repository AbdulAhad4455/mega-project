import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";




const conectDB = async ()=>{
   try {
    const conectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`\n MongoDB Conected !! Host :${conectionInstance.connection.host}`);
    //console.log(conectionInstance)
   } catch (error) {
    console.log("Conection FAILD TO MONGODB",error)
    process.exit(1);
    
   } 
}

export default conectDB
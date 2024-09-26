//require('dotenv').config({path:"./env"})
//-r dotenv/config--exprimental-json-modules 
import dotenv from "dotenv";
import conectDB from "./db/index.js";
dotenv.config({path:"./.env"})

conectDB()
then(()=> {
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running on PORT:${process.env.PORT}`);
    })

    
})
.catch((err)=>{
    console.log(`MongoDB Conection Faild ${err}`)
})


/*import express from "express";

const app = express();

;(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

    app.on("Errror",(error)=>{
        console.log("err",error);
        throw error
        
    })
    app.listen(process.env.PORT,()=>{
        console.log(`app listning on port ${process.env.PORT}`)
    })



    } catch (error) {
        console.error("ERROR",error)
        throw error
        
    }
})()*/
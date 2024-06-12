//require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import dbconnect from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
  path: "./env",
});
dbconnect().then(() => {
  app.on("error", (error) => {
    console.error("Error :", error);
    throw error;
  });
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server started at port: ${process.env.PORT}`);
  });
});

/*//This is the first approach of the connection of the database in which we have collected everything in the same file. There is also another meathod

import mongoose from "mongoose"
import {db_name} from "./constants"
import express from "express"
const app = express()
//There may be some problem in the connection of the data base thus it is always advised to use try caych block in the connection and always use async await
// mongoose.connect(database url/db_name)
(async ()=>{
    try {
        await mongoose.connect(`${process.env.DATABASE_URL}/${db_name}`)
// if our express is not working properly then use this and it is a part of express
        app.on("error",(error) => {
            console.log("ERROR",error)
        })

        app.listen(process.env.PORT,() => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("ERROR")
    }
})()
*/

import express from "express";
import {nanoid} from "nanoid";
import dotenv from "dotenv";
import connectDb from "./src/config/monogo.config.js";
import urlSchema from "./src/models/short_url.model.js";
import short_url from "./src/routes/short_url.route.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
dotenv.config("./.env");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true})); //jarurat padti hai jab bhody parde data parse krna ho

app.use("/api/create" , short_url)
app.get("/:id" , redirectFromShortUrl)

app.use(errorHandler)

app.listen(3000 , ()=> {
    connectDb()
    console.log("Server is listening on http://localhost:3000");
})

//GET - TO REDIRECT FROM OUR ORIGINAL URL TO SHORT URL (FIND THE ORIGINAL URL AND REDIRECT);

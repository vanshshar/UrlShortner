import urlSchema from "../models/short_url.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl , longUrl  ,userId) => {
   try {
       const newUrl = new urlSchema({
           full_url: longUrl,
           short_url: shortUrl
       });
       if(userId) {
           newUrl.user_id = userId;
       }
       await newUrl.save();
       return newUrl;
   } catch (err) {
       if(err.code === 11000) { //11000 is the error code for duplicate key error in mongo db
           throw new ConflictError("Short URL already exists");
       }
       throw new Error(err);
   }
}

//If we want to use any other data base in future so we just have to change this chunk of code

export const getShortUrl = async (shortUrl) => {
    return await urlSchema.findOneAndUpdate({short_url: shortUrl} , {$inc:{clicks: 1}});
}

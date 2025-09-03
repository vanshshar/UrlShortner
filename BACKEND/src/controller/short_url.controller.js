//import { generateNanoId } from "../utils/helper.js"
import { getShortUrl } from "../dao/short_url.js";
import { createShortUrlWithoutUser  } from "../services/short_url.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async (req, res) => {  //export ek hi default ho skta hai but const export kitne bhi ho skte hai isiliye const use kiya
        const {url} = req.body
        const shortUrl = await createShortUrlWithoutUser (url);
        res.send(process.env.APP_URL + shortUrl)
})

export const redirectFromShortUrl = wrapAsync(async (req , res) => {
    const{id} = req.params //id is the short url
    const url = await getShortUrl(id);
    // console.log(url.full_url);
    if(!url) throw new Error("URL not found");
    res.redirect(url.full_url);
})
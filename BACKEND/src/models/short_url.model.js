import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
    full_url: {
        type: String,
        reuiqred: true,
    },
    short_url: {
        type: String,
        required: true,
        unique: true,
        index: true, //to optimize query performance
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

const shortUrl = mongoose.model("shortUrl", shortUrlSchema); //shortUrl name mai shortUrlSchema store hoga aur isko export kar denge

export default shortUrl;
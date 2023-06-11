import mongoose from "mongoose";

let isConnected = false

export const connectToDb = async () => {
    mongoose.set("strictQuery", true);
    if (isConnected) {
        console.info("MongoDb already connected");
    }

    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            dbName: "promptopia",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true
    } catch (error) {
        console.error("Error while connecting to DB", e)
        
    }
}
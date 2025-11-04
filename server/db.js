import mongoose from "mongoose";

const connectionString=process.env.DATABASE_URL

export async function connectToDatabase(){
    if (!connectionString){
        throw new Error("DATABASE_URL is not defined in the enviroment variables");
    }
    await mongoose.connect(connectionString);
    console.log("Connected to db!");
}
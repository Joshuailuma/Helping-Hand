import mongoose from "mongoose";

const connection = {}

async function dbConnect() {
    if(connection.isConnected){

        console.log("Mongo connected");
        return;
    }

    const db = await mongoose.connect(process.env.MONGO_URI)
connection.isConnected = db.connection.readyState
console.log(connection.isConnected);
}

export default dbConnect;
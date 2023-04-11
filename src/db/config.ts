import mongoose from "mongoose";
import Config from "../config/config";


const dbConnection = async () => {
    try {
        await mongoose.connect(Config.db.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions)

        console.log("Database connected")

    } catch (e) {
        console.log(e)
        throw new Error("Error when starting the database")
    }
}


export default dbConnection

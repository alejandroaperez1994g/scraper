import * as dotenv from 'dotenv';
import Configuaration from "../interfaces/config.interface";

dotenv.config()

const ENV = process.env.NODE_ENV || 'development'

const CONFIG:Configuaration = {
    development: {
        app: {
            PORT: process.env.PORT || 4001
        },
        db: {
            uri: process.env.MONGODB_URI_CLUSTER
        }
    }
}



export default CONFIG[ENV]

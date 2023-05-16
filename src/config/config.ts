import * as dotenv from 'dotenv';
import Configuaration from "../interfaces/config.interface";

dotenv.config()

const ENV = process.env.NODE_ENV || 'development'

const CONFIG: Configuaration = {
    development: {
        app: {
            PORT: process.env.PORT || 4001
        },

    }
}


export default CONFIG[ENV]

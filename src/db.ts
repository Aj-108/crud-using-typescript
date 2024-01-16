import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: __dirname+'/.env' }) ;

export const  dbConnect = mongoose.connect(process.env.MONGO_URL||" ",{
    dbName : process.env.DB_NAME || " "
}).then(() => {
    console.log("Connected to db") ;
}).catch(err => {
    console.log("Error in connecting to db ",err) ;
})  
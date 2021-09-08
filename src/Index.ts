import app from "./api/v1/App";
import mongoose from "mongoose";

if(!process.env.DB_URI){
    throw new Error("DB_URI is not defined in env variables")
}
if(!process.env.DB_NAME){
    throw new Error("DB_NAME is not defined in env variables")
}
if(!process.env.DB_PORT){
    throw new Error("DB_PORT is not defined in env variables")
}
if(!process.env.SERVER_PORT){
    throw new Error("SERVER_PORT is not defined in env variables")
}

mongoose.connect(`mongodb://${process.env.DB_URI}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
.then(() => {
    console.log('Connected to database')
}).catch(err => {
    console.error(err)
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`server is started on port ${process.env.SERVER_PORT}`)
})
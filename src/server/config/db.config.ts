import mongoose, { ConnectOptions } from "mongoose";

export default async function dbConnect() {
    if(mongoose.connection.readyState >= 1) {
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        } as ConnectOptions);
        console.log('MongoDB connected')
    } catch(err) {
        console.log('Error MongoDB connection' + err)
    }
    mongoose.connect
}

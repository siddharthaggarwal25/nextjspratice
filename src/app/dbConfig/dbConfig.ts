import mongoose from 'mongoose'

export  default async function Connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Database successfully connected ")

        })
        connection.on('error', (error) => {
            console.log("no able to connect to databse");
            console.log(error);
            process.exit()
        })


    } catch (err) {
        console.log(" error in connection with databse ");
        console.log(err);
    }
}
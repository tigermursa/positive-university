import { Server } from 'http';
import app from "./app"
import mongoose from 'mongoose'
import config from "./app/config";



let server: Server;


async function main() {
    try {
        await mongoose.connect(config.dbUrl as string);
        console.log("mongoose connected successfully!");
        server = app.listen(config.port, () => {
            console.log(`Dear app listening on port ${config.port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main().catch(err => console.log(err));



//event driven  unhandledRejection asynchronous

process.on('unhandledRejection', (err) => {
    console.log(`😈 unhandledRejection is detected , shutting down ...`, err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

//uncaughtException synchronous
process.on('uncaughtException', () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1);
});

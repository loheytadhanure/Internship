// import mongoose from "mongoose";

// const connectDB = async () =>{

//     mongoose.connection.on('connected', () =>{
//         console.log('DB Connectedddd');
//     })

//     await mongoose.connect(`${process.env.MONGODB_URI}`)
//     // await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)

    
// }

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('DB Connected successfully');
        });
        
        await mongoose.connect(`${process.env.MONGODB_URI}`);
    } catch (error) {
        console.error('DB connection failed:', error);
    }
}

export default connectDB;
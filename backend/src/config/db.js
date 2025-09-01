const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            
        });
        console.log("Mongo Db connected Successfully");;
    } catch(error){
        console.error("MOngoDb connection error: ", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
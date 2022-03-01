const mongoose = require('mongoose');

const connectDB=async() =>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
    
        })
        console.log(`server is running ${con.connection.host}`)
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = connectDB
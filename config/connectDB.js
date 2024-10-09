const mongoose = require('mongoose');
// let mongo_url = mongodb+srv://vishvarajdgkgr:Rohan1818@cluster0.phxe2.mongodb.net/web-blog-app;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_url)
        console.log(`DB Connected`);
        
    } catch (error) {
        console.log(`Error while connecting db ${error}`);
        
        
    }
    
}
module.exports = connectDB;
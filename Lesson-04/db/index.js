import mongoose from "mongoose";
//! Sau dấu / là tên của database mình muốn kết nối
const url = "mongodb+srv://web77:senhsenh02@web77.c28ns4g.mongodb.net/web77"
const connectToDb = async() => {
    try {
        await mongoose.connect(url)
        console.log("Database connects successful!")
    } catch (error) {
        console.log(error)
    }
}

export default connectToDb
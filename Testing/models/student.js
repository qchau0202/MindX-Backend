import mongoose from "mongoose"
const student = new mongoose.Schema({
    name: {
        type: String,
    }, 
    age: {
        type: Number,
    }
})

// Create a database in mongoDB
export default mongoose.model("students", student)
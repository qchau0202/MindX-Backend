import express from "express"
import connectToDb from "./db/index.js"
import router from "./routes/index.js"
import dotenv from "dotenv"
import cors from "cors"

const app = express()
dotenv.config()
const PORT = 4000

connectToDb()

// Parse body into JSON
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"]
}))
//! Chú ý phải cho cors ở trên router để cors chạy trước
app.use(router)


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

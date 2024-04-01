import express from "express"
import connectToDb from "./db/index.js"
import router from "./routes/index.js"
import dotenv from "dotenv"

const app = express()
dotenv.config()
const PORT = 4000

connectToDb()

// Parse body into JSON
app.use(express.json())
app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

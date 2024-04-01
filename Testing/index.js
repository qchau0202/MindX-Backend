import express from "express"
import router from "./routes/index.js"

const app = express()
app.use(router)
const PORT = 8000
app.use(express.json())
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
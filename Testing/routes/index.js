import express from "express"
import student_router from "./student.js"
const router = express.Router()

router.use("/student", student_router)

export default router
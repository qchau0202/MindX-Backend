import express from "express"
import { createStudent, deleteStudent, readStudent, updateStudent } from "../controllers/student.js"

const student_router = express.Router()

student_router.post("/create-student", createStudent)
student_router.get("/read-student", readStudent)
student_router.put("/update-student", updateStudent)
student_router.delete("/delete-student", deleteStudent)

export default student_router
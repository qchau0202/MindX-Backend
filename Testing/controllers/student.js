import student from "../models/student.js";

//! Create student
export const createStudent = async (req, res) => {
    try {
        const student_data = req.body
        const result = await student.create(student_data)
        return res.status(201).json({
            result
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

//! Read student
export const readStudent = async (req, res) => {
    try {
        const all_student = await student.find()
        return res.status(201).json({
            all_student
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

//! Update student
export const updateStudent = async (req, res) => {
    try {
        const id = req.params.id
        const name = req.body.name
        const age = req.body.age

        const update = await student.findByIdAndUpdate(id, {
            name: name,
            age: age,
        }, { new: true })
        
        return res.status(201).json({
            message: "Student has succesfully updated!",
            student: update
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

//! Delete student
export const deleteStudent = async (req, res) => {
    try {
        const id = req.params.id
        await student.deleteOne({ _id: id })
        
        return res.status(201).json({
            message: "Successfully delete student"
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}
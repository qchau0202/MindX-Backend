const authorization = async (req, res, next) => {
    try {
        const user = req.user
        if (!(user.role == "admin")) {
            return res.status(403).json({
                message: "You dont have permission to get the API!"
            })
        }
        next()
    } catch (error) {
        return res.status(403).json({
            message: "You dont have permission to get the API!"
        })
    }
}
export default authorization
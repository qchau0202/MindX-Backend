import jwt from "jsonwebtoken"
const authentication = (req, res, next) => {
    try {
        // ! Nguyên tắc: đặt token lên header của request ( quy ước chung ) ( headers trong postman có mẫu )
    const bearerToken = req.headers.authorization
    
    // Kiểm tra xem có token hay chưa
    if (!bearerToken) {
        return res.status(401).json({
            message: "You have not login yet!"
        })
    }
    const token = bearerToken.split(" ")[1] //todo Lấy token từ Bearer token [Bearer, token]
    const verify = jwt.verify(token, process.env.SCRET_KEY) //todo Kiểm tra token xem đã hết hạn chưa, có sai định dạng không
    //! verify(token, secret) -> secret key ở bên trong .env

    if (!verify) {
        return res.status(401).json({
            message: "You have not login yet!"
        })
        }
    
    next() // Nếu như nó đúng thì trả lại trang mình mong muốn
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export default authentication
//! Xác thực -> Phân quyền ( nâng cao hơn )
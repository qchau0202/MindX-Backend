//! Local middleware khai báo như thế nào ?

//todo Tách hàm ra để xử lý
// Dành cho POST
const middleWarePost = (req, res, next) => {
    if (req.query?.username == "admin2") {
        next()
    } else {
        return res.status(403).json({message: "Không có quyền truy cập"})
    }
        
}
// Dành cho GET
const middleWareGet = (req, res, next) => {
    if (req.query?.username == "admin1") {
        next()
    } else {
        return res.status(403).json({message: "Không có quyền truy cập"})
    }
        
}
export {middleWareGet, middleWarePost}
import express from "express";
import morgan from "morgan";
import route from "./routes/index.js"
const app = express();
const PORT = 4000;

// Front end ( client, reactJS... ) -> Request ( get post put delete... ) -> Backend ( 1. Express.json -> 2. Routes ( get post... ) -> ... )
// ! Middleware: Những hàm nằm trung gian khi request đi qua Backend
// ! Bản chất của routes cũng là middleware nhưng có tính chất đặc biệt nên gọi là routes
// ! Sử dụng middleware để chặn các request xấu, tạo lớp bảo mật

app.use(express.json())

// ! Sử dụng route từ một folder
app.use(route)

// ! Global middleware ( bất cứ request nào đi qua sẽ phải qua các middleware này )
// todo VD: middleware check username
// app.use((req, res, next) => {
//     if (req.query?.username == "admin") {
//         next();
//     } else {
//         return res.status(403).json({message: "Không có quyền truy cập"})
//     }
// })

// todo Sử dụng middleware để làm authentication
app.use((req, res, next) => {
    console.log(`Method: ${req.method}, URL ${req.originalUrl}`)
    // Nó sẽ đi qua middleware này trước, vì không có response nên bị block ( an toàn )
    // Sử dụng tham số next ( hàm next ) để cho đi tiếp, còn nếu đã response thì không chạy tiếp ( VD: đã return thì trả về luôn, kh đi tiếp )
    next()
})

// todo Thư viện morgan ( liệt kê ra info request ): request chạy xong hết thì mới chạy được
app.use(morgan("combined")) 

app.listen(PORT, () => {
    console.log(`Server is running port ${PORT}`)
})
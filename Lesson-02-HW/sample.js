import express from "express";
const app = express()
const PORT = 4000

// ! Tại sao phải khai báo các phương thức ?
// todo -> Vì đây là tiêu chuẩn Restful API ( dùng để quy ước chung cho cả Front-end )
// Khi nào dùng GET: lấy dữ liệu ( lấy đường dẫn )
// Khi nào dùng POST: tạo mới dữ liệu
// Khi nào dùng PUT: chỉnh sửa toàn bộ dữ liệu
// Khi nào dùng PATCH: chỉnh sửa một phần dữ
// Khi nào dùng DELETE: xóa dữ liệu ( record )

// ! Sử dụng Status code
// todo -> Lưu ý chúng ta phải thêm HTTP status code ( dùng cho debug )
// Nhận diện được trạng thái của request
// Nhớ sử dụng các status code để code các trang login, signup

// ! Phân biệt 3 cách truyền dữ liệu từ client -> back-end: body, query, params ( phỏng vấn )
// Body chỉ dùng cho 3 phương thức: PUT, PATCH, POST
// Query: truyền ở trên URL ( url?search=12hdajk&username=hehe ), chỉ dùng cho GET ( GET không truyền data qua body được )
// Params: truyển ở trên URL ( url/id ) nhưng ở phía dev sẽ khai báo ở dạng url/:id -> VD: url/123 params là id=123
// ! Middleware: hàm trung gian
app.use(express.json()) // -> Đọc body gửi từ request và parse code

// ! Sau khi khai báo xong thì nên return vi chỉ trả lại cho người dùng 1 lần duy nhất

// ! Khai báo routes
// ! Phương thức GET
// todo -> Sử dụng query ( mặc định giá trị query là string )
app.get('/', (req, res) => {
    // json: Gửi về dạng json
    // send: Gửi về dạng text
    const query = req.query
    console.log(query) // Check terminal
    return res.status(200).json({
        method: "This is GET method"
    })
})

// todo -> Sử dụng body
// ! Phương thức POST
app.post('/', (req, res) => {
    // json: Gửi về dạng json
    // send: Gửi về dạng text
    const body = req.body
    // Sử dụng body để check đăng nhập
    if (body.username == "A") {
        return res.status(200).json({
            message: "Đăng nhập thành công!"
        })
    }
    
    if (!body.username) {
        return res.status(400).json({
            message: "Chưa nhập tên người dùng!"
        })
    }

    if (body.username != "A") {
        return res.status(404).json({
            message: "Nhập sai tên hoặc mật khẩu!"
        })
    }
})


// todo -> Sử dụng params
// ! Phương thức PUT
app.put('/:id', (req, res) => {
    // json: Gửi về dạng json
    // send: Gửi về dạng text
    console.log(req.params)
    return res.status(200).json({
        params: req.params
    })
})

// todo #2
app.delete('/:id', (req, res) => {

    return res.status(200)
})

// Nhận hàm callback như 1 tham số trong 1 hàm khác
// Để xem server đã run chưa
app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`)
})

// ! Homework
// ! #1
// todo -> dùng GET trả ra tất cả các bài viết, và có chức năng truyền title bài viết thông qua request query
// todo -> Trả ra các bài viết có title giống với title được truyền, nếu không truyền thì sẽ ra tất cả các bài viết
// ! #2
// todo -> dùng DELETE, lấy ra tất cả bài viết trừ bài viết được truyền vào params thông qua DELETE
app.get('/', (req, res) => {
    return res.status(200).json({
        posts:posts
    })
})
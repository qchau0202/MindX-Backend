// npm init -> create package.json

// Type: Module ( sử dụng hàm nào thì lấy hàm đó )
// import http from "http" // Mẫu import

// Type: CommonJS ( lấy hết, sau đó lấy hàm cần sử dụng )
// const http = require("http") // Mẫu

// localhost thay thế bằng 127.0.0.1 -> 127.0.0.255 ( tối đa 256 nên 255 là được )

// import http from "http"
// import {data} from "./data"
// const PORT = 4000 // ( từ 3000 - 9000 )
// Tạo một service ( để máy biết mình chạy ở đâu )
// http.createServer((req, res) => {
//     console.log(`Opening on port ${PORT}`)
//     // Request chứa tất cả thông tin từ nơi gửi request
//     console.log(req)
//     // Response chứa thông tin trả lại cho phía gửi request
//     console.log(res)
//     res.write("Hello world!")

//     res.end() // sau khi end không chạy response nữa

// }).listen(PORT)
// 2 tham số truyền vào sẽ là request, response
// dependencies chứa tất cả các thư viện sử dụng
// rs để restart server lại
// Sử dụng Postman ( công cụ để test ) để kiểm tra các requests

// !NOTE
// -> Kiểm tra network ( mô hình hoạt động giữa backend và frontend )
// Mô hình MVC ( đã load sẵn từ server và đưa lên web rồi sau đó mới chạy )
// Mô hình client-server ( request rồi back-end mới đưa, bấm vào đâu đó rồi mới load ra )
// Client: ReactJS
// Server: NodeJS
// Server-size rendering ( load sẵn từ server ) và Client-size rendering ( lấy từ back-end xong rồi load )

// !NOTE
// Cần nhớ: NodeJS là 1 môi trường thực thi code Javascript ( KO PHẢI FRAMEWORK )
// Cấu trúc Request - Response
// nodemon hỗ trợ auto kill server và restart để chạy server tiếp


// Lesson 02
// VD: kiểu dữ liệu string mà thêm dấu + sẽ thành số
// VD: id ( string ) -> +id ( number )
// ! Path gồm 2 thành phần:
// ! 1. Cố định
// ! 2. Biến

// ! 5 loại phổ biến: GET PATCH PUT POST DELETE
import express from 'express';
import http from "http"
import { datas } from "./data.js"
const app = express();
const PORT = 4000;


// ! Middleware
app.use(express.json())

// Get data
app.get('', (req, res) => {
    const helloWorld = "Hello world"
    res.send(helloWorld);
});

// Get product's name
app.get("/product", (req, res) => {
  console.log(req.query);
  const brand = req.query.brand;
  if (brand) {
    const filterData = datas.filter((item) => item.brand === brand);
    res.send(filterData);
  }
  res.send(datas);
});

// Get product's id
app.get("/san-pham/:id", (req, res) => {
  // :id là 1 param trong object req.params
  const id = req.params.id;
  if (id) {
    const product = datas.find((item) => item.id === +id);
    if (!product) {
      res.status(404).send("Không tìm thấy sản phẩm");
      return;
    }
    res.send(product);
  }
});


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})


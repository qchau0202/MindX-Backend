import express from "express"
import { middleWareGet, middleWarePost } from "../middlewares/index.js"
import users from "../data/index.js"

const route = express.Router()

//! Homework
route.get("/find-user-by-name", (req, res) => {
    const userName = req.query.username; 
    if (userName) {
        const filter = users.filter(user => user.username === userName);
        if (filter.length > 0) {
            return res.status(200).json({
                message: "Find username: User has been found successfully",
                user: filter
            });
        } else {
            return res.status(404).json({
                message: "User is not found",
                getName: "This is get name"
            });
        }
    } else {
        return res.status(400).json({ message: "Invalid username" });
    }
    // get user theo tên người dùng, trả ra object
});


route.get("/sort-user-by-age-asc", (req, res) => {
    for (let i = 0; i < users.length - 1; i++) {
        for (let j = 0; j < users.length - i - 1; j++) {
            // Nếu như user tại vị trí j > user tại vị trí tiếp theo, switch user
            if (users[j].age > users[j + 1].age) {
                const temp = users[j];
                users[j] = users[j + 1];
                users[j + 1] = temp;
            }
        }
    }
    // Return the sorted array of users
    return res.status(200).json({
        message: "Age in ascending order",
        users: users
    });
    // Trả ra mảng người dùng được sắp xếp theo thứ tự tăng dần
})

route.get("/sort-user-by-age-des", (req, res) => {
    for (let i = 0; i < users.length - 1; i++) {
        for (let j = 0; j < users.length - i - 1; j++) {
            // Nếu như user tại vị trí j < user tại vị trí tiếp theo, switch user
            if (users[j].age < users[j + 1].age) {
                const temp = users[j];
                users[j] = users[j + 1];
                users[j + 1] = temp;
            }
        }
    }
    // Return the sorted array of users
    return res.status(200).json({
        message: "Age in descending order",
        users: users
    });
    // Trả ra mảng người dùng được sắp xếp theo thứ tự giảm dần
})

route.get("/:id", (req, res) => {
    const userId = req.params.id; 
    if (userId) {
        const filter = users.filter(user => user.id == userId); 
        if (filter.length > 0) {
            return res.status(200).json({
                message: "Find ID: User has been found successfully",
                user: filter
            });
        } else {
            return res.status(404).json({
                message: "User is not found",
                getId: "This is get ID"
            });
        }
    } else {
        return res.status(400).json({ message: "Invalid user's ID" });
    }
    // get user theo id, trả ra user cho phía client
    // ! VD: return res.status(200).json({...})
    //todo: Làm cả các condition như không tìm thấy id, id sai...
});
//! Chức năng login
route.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // Thiếu email
    if (!email) {
        return res.status(400).json({ message: "Nhập email!" })
    }
    
    // Thiếu password
    if (!password) {
        return res.status(400).json({ message: "Nhập password!" })
    }

    const findUser = users.find(item => item.email == email)


    if (!findUser) {
        return res.status(400).json({message: "Không tìm thấy người dùng!"})
    }
    if (!(findUser.password == password)) {
        return res.status(400).json({message: "Không đúng mật khẩu!"})
    }

    return res.status(400).json({message: "Đăng nhập thành công!"})

})


// Khai báo sau phần URL tên hàm
route.get("/hello-world", middleWareGet, (req, res) => {
    return res.status(200).json({message: "Hello world!"})
})

route.post("/hello-world-post", middleWarePost, (req, res) => {
    return res.status(200).json({message: "Hello world posts!"})
})

export default route
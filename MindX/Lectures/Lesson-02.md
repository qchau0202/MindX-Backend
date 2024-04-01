# 1: Đảm bảo cài đặt được Express, nodemon

# 2: Biết 3 đối tượng của request: req.params, req.query, req.body

## 2.1: Khi nào dùng params

Khi nào là id sản phẩm, id bài viết..., nếu như chỉ là 1 trường thông tin duy nhất

## 2.2: Khi nào dùng query

Khi có nhiều tham số cần truyền vào
Nhưng không cần quá bảo mật
VD: Tìm kiếm, sắp xếp, phân trang, lọc data

## 2.3: Khi nào dùng body

Khi cần truyền nhiều tham số
Khi cần bảo mật thông tin

# 3: Ôn tập các phương thức HTTP: GET POST PUT(PATCH) DELETE

# 4: Status code và ý nghĩa

Information responses: 100 - 199
Succesful responses: 200 - 299
Redirection messages: 300 - 399
Client error responses: 400 - 499
Server error responses: 500 - 599
! 200 - OK: Xử lý thành công
! 201 - Created: dùng khi thêm hoặc cập nhật thành công
! 401 - Unauthorized: dùng khi server không xác thực được thông tin xác thực của client gửi lên
! 403 - Forbidden: dùng khi request nào đó không được phép sử dụng API, khác với 401, 403 đã xác thực được client nhưng request này bị cấm.
! 404 - Not found: dùng khi server không thể tìm thấy thông tin nguồn tài nguyên mà client yêu cầu.
! 500 - Internal Server error: lỗi này thuộc về phía server khi không thể xử lý được thông tin và không biết xử lý như thế nào

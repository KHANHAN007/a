

frontend/
│── assets/                        # Chứa tài nguyên tĩnh như ảnh, icon, font
│   ├── images/                    # Ảnh minh họa, icon
│   ├── fonts/                      # Font chữ nếu cần
│── css/                            # Chứa file CSS
│   ├── style.css                   # CSS chung cho toàn bộ ứng dụng
│   ├── auth.css                    # CSS cho trang đăng nhập, đăng ký
│   ├── dashboard.css               # CSS cho trang dashboard
│   ├── food.css                    # CSS cho trang quản lý food
│   ├── recipe.css                  # CSS cho trang quản lý công thức
│── js/                             # Chứa các file JavaScript
│   ├── main.js                     # File JS chính
│   ├── auth.js                     # Xử lý đăng nhập, đăng ký
│   ├── dashboard.js                # Xử lý trang dashboard
│   ├── food.js                     # Xử lý trang quản lý food
│   ├── recipe.js                   # Xử lý trang quản lý công thức
│   ├── modal.js                    # Xử lý mở/đóng modal chung
│   ├── utils.js                     # Các hàm tiện ích (validate form, định dạng dữ liệu)
│── pages/                          # Chứa các trang HTML chính
│   ├── index.html                   # Trang chủ
│   ├── login.html                   # Trang đăng nhập
│   ├── register.html                # Trang đăng ký
│   ├── dashboard.html               # Trang dashboard
│   ├── food-list.html               # Trang quản lý danh sách food
│   ├── recipe-list.html             # Trang quản lý danh sách công thức
│   ├── recipe-detail.html           # Trang chi tiết công thức
│   ├── add-recipe.html              # Trang thêm mới công thức
│── components/                      # Chứa các thành phần giao diện tái sử dụng
│   ├── navbar.html                   # Navbar chung
│   ├── sidebar.html                  # Sidebar menu
│   ├── footer.html                   # Footer chung
│   ├── recipe-card.html              # Giao diện một công thức món ăn
│   ├── food-card.html                # Giao diện một món ăn
│── README.md                         # Hướng dẫn dự án


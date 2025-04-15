document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.includes("register.html")) {
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("confirm-password");

        const nameError = document.getElementById("name-error");
        const emailError = document.getElementById("email-error");
        const passwordError = document.getElementById("password-error");
        const confirmError = document.getElementById("confirm-error");

        const signUpBtn = document.querySelector(".btn-login");
        const successMess = document.querySelector(".success-mess");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function clearErrors() {
            nameError.textContent = "";
            emailError.textContent = "";
            passwordError.textContent = "";
            confirmError.textContent = "";
        }

        signUpBtn.addEventListener("click", () => {
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            clearErrors();

            let isValid = true;

            if (!name) {
                nameError.textContent = "Họ và tên không được để trống.";
                isValid = false;
            }

            if (!email) {
                emailError.textContent = "Email không được để trống.";
                isValid = false;
            } else if (!emailRegex.test(email)) {
                emailError.textContent = "Email không đúng định dạng.";
                isValid = false;
            }

            if (!password) {
                passwordError.textContent = "Mật khẩu không được để trống.";
                isValid = false;
            } else if (password.length < 8) {
                passwordError.textContent = "Mật khẩu phải có ít nhất 8 ký tự.";
                isValid = false;
            }

            if (password !== confirmPassword) {
                confirmError.textContent = "Mật khẩu xác nhận không khớp.";
                isValid = false;
            }

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const isEmailExist = users.some(user => user.email === email);
            if (isEmailExist) {
                emailError.textContent = "Email đã tồn tại. Vui lòng dùng email khác.";
                isValid = false;
            }

            if (!isValid) return;

            const newUser = {
                name,
                email,
                password,
                avatar: "https://i.pinimg.com/564x/c9/1f/55/c91f55d2ecb05ad5e7e10b6d95a22489.jpg",
                dob: "",
                phone: "",
                favoriteRecipes: [],
                personalFoods: [],
                personalRecipes: []
            };

            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            successMess.classList.add("show");
            setTimeout(() => {
                successMess.classList.remove("show");
                window.location.href = "../pages/login.html?success=1";
            }, 2000);
        });
    }

    if (path.includes("login.html")) {
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const loginBtn = document.querySelector(".btn-login");

        const errorMess = document.querySelector(".error-mess");
        const successMess = document.querySelector(".success-mess");
        const rememberCheckbox = document.getElementById("rememberMe");

        const rememberedEmail = localStorage.getItem("rememberedEmail");
        if (rememberedEmail) {
            emailInput.value = rememberedEmail;
            if (rememberCheckbox) rememberCheckbox.checked = true;
        }

        function showError(message) {
            if (!errorMess) return;
            errorMess.querySelector(".content").textContent = message;
            errorMess.classList.remove("show");
            void errorMess.offsetWidth;
            errorMess.classList.add("show");
            setTimeout(() => errorMess.classList.remove("show"), 3000);
        }

        function showSuccess() {
            successMess.classList.add("show");
            setTimeout(() => {
                successMess.classList.remove("show");
                window.location.href = "../pages/home.html?view=account";
            }, 2000);
        }

        loginBtn.addEventListener("click", () => {
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            if (rememberCheckbox && rememberCheckbox.checked) {
                localStorage.setItem("rememberedEmail", email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

            if (!email || !password) {
                showError("Email và mật khẩu không được để trống.");
                return;
            }

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userIndex = users.findIndex(u => u.email === email && u.password === password);

            if (userIndex === -1) {
                showError("Email hoặc mật khẩu không chính xác.");
                return;
            }

            const user = users[userIndex];
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("currentUser", JSON.stringify(user));

            showSuccess();
        });
    }

    const closeBtn = document.querySelector(".close-btn");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            const errorMess = document.querySelector(".error-mess");
            errorMess.classList.remove("show");
        });
    }
});

document.querySelectorAll(".show-hide").forEach(toggle => {
    toggle.addEventListener("click", () => {
        const targetId = toggle.getAttribute("data-target");
        const input = document.getElementById(targetId);

        if (input) {
            const isPassword = input.type === "password";
            input.type = isPassword ? "text" : "password";

            toggle.innerHTML = isPassword
                ? `<lord-icon src="https://cdn.lordicon.com/knitbwfa.json" trigger="loop" stroke="light" style="width:30px;height:30px"></lord-icon>`
                : `<lord-icon src="https://cdn.lordicon.com/dicvhxpz.json" trigger="hover" stroke="light" style="width:24px;height:24px"></lord-icon>`;
        }
    });
});

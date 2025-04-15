function initAccount() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const avatar = document.getElementById("avatarPreview");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const dob = document.getElementById("dob");
    const phone = document.getElementById("phone");

    if (avatar) avatar.src = currentUser.avatar || "https://default-avatar-url.jpg";
    if (name) name.value = currentUser.name || "";
    if (email) email.value = currentUser.email || "";
    if (dob) dob.value = currentUser.dob || "";
    if (phone) phone.value = currentUser.phone || "";

    const cameraIcon = document.getElementById("icon");
    const fileInput = document.getElementById("avatarInput");
    if (cameraIcon && fileInput) {
        cameraIcon.addEventListener("click", () => fileInput.click());
    }

    if (fileInput && avatar) {
        fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const avatarDataURL = reader.result;
                    avatar.src = avatarDataURL;

                    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
                    const users = JSON.parse(localStorage.getItem("users")) || [];
                    const index = users.findIndex(u => u.email === currentUser.email);
                    if (index !== -1) {
                        users[index].avatar = avatarDataURL;
                        currentUser.avatar = avatarDataURL;

                        localStorage.setItem("users", JSON.stringify(users));
                        localStorage.setItem("currentUser", JSON.stringify(currentUser));
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const saveBtn = document.getElementById("saveInfo");
    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const index = users.findIndex(u => u.email === currentUser.email);
            if (index !== -1) {
                users[index].name = name.value;
                users[index].dob = dob.value;
                users[index].phone = phone.value;
                users[index].avatar = avatar.src;

                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem("currentUser", JSON.stringify(users[index]));

                showSuccessMessage("The information has been updated");
            }
        });
    }
}

function showSuccessMessage(message) {
    const box = document.querySelector(".success-mess");
    const content = box?.querySelector(".content-succes");

    if (box && content) {
        content.textContent = message;
        box.classList.add("show");

        setTimeout(() => {
            box.classList.remove("show");
        }, 3000);
    }
}

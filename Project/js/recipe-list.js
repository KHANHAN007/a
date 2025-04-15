function initRecipeList() {
    const allRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
    let currentRecipes = [...allRecipes];
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;
    const favoriteQuantityEl = document.querySelector(".favorite-quantity");
    if (favoriteQuantityEl && currentUser.favoriteRecipes) {
        favoriteQuantityEl.textContent = currentUser.favoriteRecipes.length;
    }

    const recipeList = document.querySelector(".recipe-list");
    const searchInput = document.querySelector(".search-food");
    const sortSelect = document.querySelectorAll(".category-filter")[0];
    const filterSelect = document.querySelectorAll(".category-filter")[1];
    const paginationContainer = document.querySelector(".pagination");

    const itemsPerPage = 8;
    let currentPage = parseInt(localStorage.getItem("recipeCurrentPage")) || 1;

    ["All", "energy", "fat", "carb", "protein"].forEach(n => {
        const opt = document.createElement("option");
        opt.value = n;
        opt.textContent = n === "All" ? "All" : n.charAt(0).toUpperCase() + n.slice(1);
        sortSelect.appendChild(opt);
    });

    const allCategories = ["All", ...new Set(allRecipes.flatMap(r => r.categories))];
    allCategories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        filterSelect.appendChild(option);
    });

    function renderRecipes(data) {
        recipeList.innerHTML = "";

        const totalPages = Math.ceil(data.length / itemsPerPage);
        if (currentPage > totalPages) currentPage = totalPages || 1;

        const start = (currentPage - 1) * itemsPerPage;
        const paginated = data.slice(start, start + itemsPerPage);

        paginated.forEach(recipe => {
            const isLiked = currentUser.favoriteRecipes.includes(recipe.id);
            const div = document.createElement("div");
            div.className = "recipe-element";
            div.innerHTML = `
            <div class="recipe-represent">
                <div class="community-recipes">
                    <div class="logo-recipe"></div>
                    <div class="community-content">Community Recipes</div>
                </div>
                <div class="recipe-img"></div>
            </div>
            <div class="recipe-container">
                <div class="recipe-content">${recipe.title}</div>
                <div class="author-like">
                    <div class="author">
                        <div class="avatar" style="background-image: url('${recipe.avatar || "https://i.imgur.com/6VBx3io.png"}'); background-size: cover; background-position: center;"></div>                       <span>${recipe.author}</span>
                    </div>
                    <div class="like-container" data-id="${recipe.id}">
                        <div class="like-img ${isLiked ? "liked" : ""}">${isLiked ? "favorite" : "favorite_border"}</div>
                        <div class="quantity">${recipe.like}</div>
                    </div>
                </div>
                <div class="typeOfFood">
                    <div class="typeOfFood-img"></div>
                    <div class="typeOfFood-content">${recipe.categories.join(", ")}</div>
                </div>
                <div class="recipe-nutrition">
                    <div class="nutrient-element"><div class="title-nutrient">by</div><div class="title-nutrient">100g</div></div>
                    <div class="nutrient-element"><div class="title-nutrient">Energy</div><div class="value">${recipe.nutrient.energy} kcal</div></div>
                    <div class="nutrient-element"><div class="title-nutrient">Fat</div><div class="value">${recipe.nutrient.fat}g</div></div>
                    <div class="nutrient-element"><div class="title-nutrient">Carbohydrate</div><div class="value">${recipe.nutrient.carb}g</div></div>
                    <div class="nutrient-element"><div class="title-nutrient">Protein</div><div class="value">${recipe.nutrient.protein}g</div></div>
                </div>
            </div>
        `;
            const imgBox = div.querySelector(".recipe-img");
            imgBox.style.backgroundImage = `url('${recipe.coverSrc || "https://source.unsplash.com/600x400/?food"}')`;
            div.addEventListener("click", (e) => {
                if (e.target.closest(".like-container")) return;
                openRecipeModal(recipe.id);
            });

            recipeList.appendChild(div);
        });

        attachLikeEvents();
        renderPagination(data.length);
    }


    function attachLikeEvents() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        let allRecipes = JSON.parse(localStorage.getItem("allRecipes")) || window.allRecipes || [];

        const favoriteQuantityEl = document.querySelector(".favorite-quantity");

        document.querySelectorAll(".like-container").forEach(container => {
            const icon = container.querySelector(".like-img");
            const quantityEl = container.querySelector(".quantity");
            const recipeId = Number(container.dataset.id);
            const recipe = allRecipes.find(r => r.id === recipeId);
            if (!recipe) return;

            const isLikedInit = currentUser.favoriteRecipes.includes(recipeId);
            icon.textContent = isLikedInit ? "favorite" : "favorite_border";
            icon.classList.toggle("liked", isLikedInit);

            container.addEventListener("click", (e) => {
                e.stopPropagation();
                const isLiked = currentUser.favoriteRecipes.includes(recipeId);

                if (isLiked) {
                    currentUser.favoriteRecipes = currentUser.favoriteRecipes.filter(id => id !== recipeId);
                    recipe.like = Math.max(0, recipe.like - 1);
                    icon.textContent = "favorite_border";
                    icon.classList.remove("liked");
                } else {
                    currentUser.favoriteRecipes.push(recipeId);
                    recipe.like += 1;
                    icon.textContent = "favorite";
                    icon.classList.add("liked");
                }

                quantityEl.textContent = recipe.like;
                if (favoriteQuantityEl) favoriteQuantityEl.textContent = currentUser.favoriteRecipes.length;

                users[userIndex] = currentUser;
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                localStorage.setItem("allRecipes", JSON.stringify(allRecipes));
            });
        });
    }

    function renderPagination(total) {
        paginationContainer.innerHTML = "";
        const totalPages = Math.ceil(total / itemsPerPage);

        const isMyRecipes = localStorage.getItem("isMyRecipesActive") === "true";
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const recipesToRender = isMyRecipes
            ? allRecipes.filter(recipe => currentUser.personalRecipes.includes(recipe.id))
            : currentRecipes;

        const prevBtn = document.createElement("button");
        prevBtn.className = "prev";
        prevBtn.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                localStorage.setItem("recipeCurrentPage", currentPage);
                renderRecipes(recipesToRender);
            }
        });
        paginationContainer.appendChild(prevBtn);

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.className = "page";
            btn.textContent = i;
            if (i === currentPage) btn.classList.add("active");
            btn.addEventListener("click", () => {
                currentPage = i;
                localStorage.setItem("recipeCurrentPage", currentPage);
                renderRecipes(recipesToRender);
            });
            paginationContainer.appendChild(btn);
        }

        const nextBtn = document.createElement("button");
        nextBtn.className = "next";
        nextBtn.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                localStorage.setItem("recipeCurrentPage", currentPage);
                renderRecipes(recipesToRender);
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        currentRecipes = allRecipes.filter(r =>
            r.title.toLowerCase().includes(query) ||
            r.author.toLowerCase().includes(query) ||
            r.categories.some(category => category.toLowerCase().includes(query))
        );
        currentPage = 1;
        localStorage.setItem("recipeCurrentPage", currentPage);
        renderRecipes(currentRecipes);
    });

    sortSelect.addEventListener("change", () => {
        const val = sortSelect.value;
        currentRecipes = val === "All"
            ? [...allRecipes]
            : [...allRecipes].sort((a, b) => b.nutrient[val] - a.nutrient[val]);
        currentPage = 1;
        localStorage.setItem("recipeCurrentPage", currentPage);
        renderRecipes(currentRecipes);
    });

    filterSelect.addEventListener("change", () => {
        const val = filterSelect.value;
        currentRecipes = val === "All"
            ? [...allRecipes]
            : allRecipes.filter(r => Array.isArray(r.categories)
                ? r.categories.includes(val)
                : r.categories === val);
        currentPage = 1;
        localStorage.setItem("recipeCurrentPage", currentPage);
        renderRecipes(currentRecipes);
    });
    document.querySelector('.btn-create').addEventListener('click', () => {
        const btn = document.querySelector('.btn-create');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const myRecipeIds = currentUser.personalRecipes;
        btn.classList.toggle('active');
        localStorage.setItem('isMyRecipesActive', btn.classList.contains('active') ? 'true' : 'false');
        if (btn.classList.contains('active')) {
            const myRecipes = allRecipes.filter(recipe => myRecipeIds.includes(recipe.id));
            btn.textContent = 'My Recipes'; currentPage = 1; renderRecipes(myRecipes);
        } else {
            btn.textContent = 'All Recipes'; currentPage = parseInt(localStorage.getItem("recipeCurrentPageAllRecipes")) || 1;
            localStorage.setItem("recipeCurrentPage", currentPage);
            renderRecipes(currentRecipes);
        }
    });
    renderRecipes(currentRecipes);
}
function openRecipeModal(recipeId) {
    fetch("../components/recipe-infor.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById('recipeModalBody').innerHTML = data;

            const modal = document.getElementById('recipeModal');
            modal.classList.add('show');
            modal.dataset.recipeId = recipeId;
            loadScript("../js/recipe-infor.js", function () {
                if (typeof initRecipeInfo === "function") {
                    initRecipeInfo(recipeId);
                }
            });
        })
        .catch(error => console.error("Có lỗi khi tải recipe-infor.html:", error));
}

function closeModal() {
    const modal = document.getElementById('recipeModal');
    modal.classList.remove('show');
    initRecipeList();
}




document.querySelector('.close-btn').addEventListener('click', closeModal);

document.querySelectorAll('.recipe-element').forEach(item => {
    item.addEventListener('click', function () {
        var recipeId = item.dataset.recipeId; openRecipeModal(recipeId);
    });
});




function loadScript(src, onloadCallback) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = onloadCallback;
    document.body.appendChild(script);
}

function openAddRecipeModal() {
    fetch("../components/recipe-add.html")
        .then(res => res.text())
        .then(html => {
            document.getElementById("recipeAddModalBody").innerHTML = html;
            document.getElementById("recipeAddModal").classList.add("show");

            loadScript("../js/recipe-add.js", () => {
                if (typeof initRecipeAddModal === "function") {
                    initRecipeAddModal();
                } else {
                    console.warn("initRecipeAddModal not found!");
                }
            });
        })
        .catch(err => console.error("Không thể load modal add recipe:", err));
}


function closeAddRecipeModal() {
    document.getElementById("recipeAddModal").classList.remove("show");
}

window.addEventListener("click", function (event) {
    const recipeModal = document.getElementById('recipeModal');
    const recipeAddModal = document.getElementById('recipeAddModal');

    if (recipeModal && event.target === recipeModal) {
        closeModal();
    }

    if (recipeAddModal && event.target === recipeAddModal) {
        closeAddRecipeModal();
        initRecipeList();
    }
});


document.querySelector(".add-recipe").addEventListener("click", openAddRecipeModal);

function showSuccessMessage(message) {
    const successMessageElement = document.querySelector('.success-mess');
    successMessageElement.querySelector('.content-succes').textContent = message;
    successMessageElement.classList.add('show');

    setTimeout(() => {
        successMessageElement.classList.remove('show');
    }, 3000);
}

function showErrorMessage(message) {
    const errorMessageElement = document.querySelector('.error-mess');
    errorMessageElement.querySelector('.content').textContent = message;
    errorMessageElement.classList.add('show');

    setTimeout(() => {
        errorMessageElement.classList.remove('show');
    }, 3000);
}

document.querySelector('.close-btn').addEventListener('click', () => {
    const errorMessageElement = document.querySelector('.error-mess');
    errorMessageElement.classList.remove('show');
});

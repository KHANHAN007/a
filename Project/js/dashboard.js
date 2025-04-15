function initRecipeDashboard() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        window.location.href = "../pages/login.html";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUserIndex = users.findIndex(u => u.email === currentUser.email);

    window.allRecipes = allRecipes;

    const favoriteIds = currentUser.favoriteRecipes || [];
    const recipes = allRecipes.filter(recipe => favoriteIds.includes(recipe.id));

    const itemsPerPage = 8;
    let currentPage = 1;
    let currentRecipes = [...recipes];

    const recipeList = document.querySelector(".recipe-list");
    const searchInput = document.querySelector(".search-food");
    const sortSelect = document.querySelectorAll(".category-filter")[0];
    const filterSelect = document.querySelectorAll(".category-filter")[1];

    ["All", "energy", "fat", "carb", "protein"].forEach(n => {
        const opt = document.createElement("option");
        opt.value = n;
        opt.textContent = n === "All" ? "All" : n.charAt(0).toUpperCase() + n.slice(1);
        sortSelect.appendChild(opt);
    });

    const allCategories = [...new Set(recipes.flatMap(r => r.categories || []))];
    ["All", ...allCategories].forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        filterSelect.appendChild(option);
    });

    function renderRecipes(data) {
        recipeList.innerHTML = "";
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
                        <div class="avatar" style="background-image: url('${recipe.avatar || "https://i.imgur.com/6VBx3io.png"}'); background-size: cover; background-position: center;"></div>
                            <span>${recipe.author}</span>
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

            div.addEventListener("click", (e) => {
                if (e.target.closest(".like-container")) {
                    return;
                }

                openRecipeModal(recipe.id);
            });

            recipeList.appendChild(div);
        });

        renderPagination(data.length);
        attachLikeEvents();
    }

    function attachLikeEvents() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        let allRecipes = JSON.parse(localStorage.getItem("allRecipes")) || window.allRecipes || [];

        document.querySelectorAll(".like-container").forEach(container => {
            const icon = container.querySelector(".like-img");
            const quantityEl = container.querySelector(".quantity");
            const recipeId = Number(container.dataset.id);
            const recipe = allRecipes.find(r => r.id === recipeId);
            if (!recipe) return;

            const isLikedInit = currentUser.favoriteRecipes.includes(recipeId);
            icon.textContent = isLikedInit ? "favorite" : "favorite_border";
            icon.classList.toggle("liked", isLikedInit);

            container.addEventListener("click", () => {
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

                users[userIndex] = currentUser;
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                localStorage.setItem("allRecipes", JSON.stringify(allRecipes));
            });
        });
    }

    function renderPagination(total) {
        const paginationContainer = document.querySelector(".pagination");
        paginationContainer.innerHTML = "";

        const totalPages = Math.ceil(total / itemsPerPage);
        const maxVisiblePages = 3;

        function createBtn(content, classNames, disabled, onClick) {
            const btn = document.createElement("button");
            btn.className = `page ${classNames}`;
            btn.innerHTML = content;
            btn.disabled = disabled;
            btn.addEventListener("click", onClick);
            return btn;
        }

        paginationContainer.appendChild(
            createBtn(
                '<i class="fa-solid fa-backward"></i>',
                currentPage === 1 ? "prev disabled" : "prev",
                currentPage === 1,
                () => {
                    if (currentPage > 1) {
                        currentPage--;
                        renderRecipes(currentRecipes);
                        renderPagination(total);
                    }
                }
            )
        );

        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (startPage > 1) {
            paginationContainer.appendChild(createBtn('1', '', false, () => changePage(1)));
            paginationContainer.appendChild(createBtn('...', '', true, null));
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationContainer.appendChild(
                createBtn(
                    i,
                    currentPage === i ? "bg-blue-500 text-white active" : "bg-white",
                    false,
                    () => changePage(i)
                )
            );
        }

        if (endPage < totalPages) {
            paginationContainer.appendChild(createBtn('...', '', true, null));
            paginationContainer.appendChild(createBtn(totalPages, '', false, () => changePage(totalPages)));
        }

        paginationContainer.appendChild(
            createBtn(
                '<i class="fa-solid fa-forward"></i>',
                currentPage === totalPages ? "next disabled" : "next",
                currentPage === totalPages,
                () => {
                    if (currentPage < totalPages) {
                        currentPage++;
                        renderRecipes(currentRecipes);
                        renderPagination(total);
                    }
                }
            )
        );
    }

    function changePage(page) {
        const totalPages = Math.ceil(currentRecipes.length / itemsPerPage);
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        renderRecipes(currentRecipes);
        renderPagination(currentRecipes.length);
    }

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        currentRecipes = recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(query) ||
            recipe.author.toLowerCase().includes(query) ||
            recipe.category.toLowerCase().includes(query)
        );
        currentPage = 1;
        renderRecipes(currentRecipes);
    });

    sortSelect.addEventListener("change", function () {
        const sortValue = sortSelect.value;
        if (sortValue === "All") {
            currentRecipes = [...recipes];
        } else {
            currentRecipes = [...recipes].sort((a, b) => a.nutrient[sortValue] - b.nutrient[sortValue]);
        }
        currentPage = 1;
        renderRecipes(currentRecipes);
    });

    filterSelect.addEventListener("change", function () {
        const selectedCategory = filterSelect.value;
        if (selectedCategory === "All") {
            currentRecipes = [...recipes];
        } else {
            currentRecipes = recipes.filter(recipe =>
                Array.isArray(recipe.categories) &&
                recipe.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase())
            );
        }
        currentPage = 1;
        renderRecipes(currentRecipes);
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
    initRecipeDashboard();
}

document.querySelector('.close-btn').addEventListener('click', closeModal);

window.onclick = function (event) {
    if (event.target === document.getElementById('recipeModal')) {
        closeModal();
    }
};

document.querySelectorAll('.recipe-element').forEach(item => {
    item.addEventListener('click', function () {
        var recipeId = item.dataset.recipeId;
        openRecipeModal(recipeId);
    });
});

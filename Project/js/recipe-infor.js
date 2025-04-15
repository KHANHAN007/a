function initRecipeInfo(recipeId) {
    const recipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
    const recipe = recipes.find(r => r.id === parseInt(recipeId));
    if (!recipe) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const isLiked = currentUser.favoriteRecipes.includes(parseInt(recipeId));
    updateLikeButton(isLiked);

    document.querySelector(".recipe-imgs").style.backgroundImage = `url('${recipe.avatar || "https://i.imgur.com/6VBx3io.png"}')`;
    document.querySelector(".community-contents").textContent = "Community Recipes";
    document.querySelector(".typeOfFood-contents").textContent = recipe.categories.join(", ") || "No category";
    document.querySelector(".quantitys").textContent = recipe.like || 0;

    const basicElements = document.querySelectorAll(".basicInfor-element .element-content");
    if (basicElements.length >= 7) {
        basicElements[0].textContent = recipe.title;
        basicElements[1].textContent = recipe.description || "No description";
        basicElements[2].textContent = recipe.author;
        basicElements[3].textContent = recipe.totalTime || "00:40";
        basicElements[4].textContent = recipe.prepTime || "00:40";
        basicElements[5].textContent = recipe.finalWeight || "978.8 grams";
        basicElements[6].textContent = recipe.portions || "4";
    }

    document.querySelector(".energy-container .value").textContent = recipe.nutrient.energy || "0";
    document.querySelector(".img1 .value").textContent = recipe.nutrient.fat + "g";
    document.querySelector(".img2 .value").textContent = recipe.nutrient.carb + "g";
    document.querySelector(".img3 .value").textContent = recipe.nutrient.protein + "g";
    document.querySelector(".img4 .value").textContent = recipe.nutrient.fiber + "g";

    if (typeof Chart !== "undefined") {
        const ctx = document.getElementById("nutritional-value-chart")?.getContext("2d");
        if (ctx) {
            new Chart(ctx, {
                type: "pie",
                data: {
                    labels: ["Fat", "Carbohydrate", "Protein", "Fiber"],
                    datasets: [{
                        data: [
                            recipe.nutrient.fat,
                            recipe.nutrient.carb,
                            recipe.nutrient.protein,
                            recipe.nutrient.fiber
                        ],
                        backgroundColor: ["#e74c64", "#eca37e", "#1abc9c", "#9b59b6"]
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            position: "bottom"
                        },
                        datalabels: {
                            color: "#FFF",
                            align: "end",
                            anchor: "center",
                            clamp: true,
                            font: {
                                family: "Inter",
                                size: 13,
                                weight: "400",
                                style: "normal",
                                lineHeight: "normal"
                            },
                            formatter: (value, ctx) => {
                                const total = ctx.chart._metasets[0].total;
                                const percentage = (value / total * 100).toFixed(1);
                                return `${percentage}%`;
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels],
            });
        }
    }

    const methodListEl = document.querySelector(".method-list");
    if (methodListEl && Array.isArray(recipe.cookingMethods)) {
        methodListEl.innerHTML = "";
        recipe.cookingMethods.forEach((stepObj, index) => {
            const methodEl = document.createElement("div");
            methodEl.className = "method-element";
            methodEl.innerHTML = `
                <div class="step">${stepObj.id ?? index + 1}</div>
                <div class="text">${stepObj.content}</div>
            `;
            methodListEl.appendChild(methodEl);
        });
    }

    const ingredientListEl = document.querySelector(".ingredients-list");
    if (ingredientListEl && Array.isArray(recipe.ingredients)) {
        ingredientListEl.innerHTML = "";
        recipe.ingredients.forEach(ingredient => {
            const ingredientEl = document.createElement("div");
            ingredientEl.className = "ingredients-element";
            ingredientEl.innerHTML =
                (typeof ingredient === "object" && ingredient !== null)
                    ? `<div class="content">1 serving of ${ingredient.name || "Unknown"} (${ingredient.mass || 0} grams)</div>`
                    : `<div class="content">${ingredient}</div>`;
            ingredientListEl.appendChild(ingredientEl);
        });
    }

    const micronutrientListEl = document.querySelector(".Micronutrients-list");
    if (micronutrientListEl && Array.isArray(recipe.micronutrients)) {
        micronutrientListEl.innerHTML = "";
        recipe.micronutrients.forEach(micro => {
            const elementEl = document.createElement("div");
            elementEl.className = "element";
            elementEl.innerHTML = `
                <div class="name">${micro.name}</div>
                <div class="value-box">
                    <div class="value">${micro.value}</div>
                    <div class="mass">${micro.mass}</div>
                </div>
            `;
            micronutrientListEl.appendChild(elementEl);
        });
    }

    document.querySelector(".like-containers").addEventListener("click", function () {
        toggleLikeRecipe(recipeId);
    });
}

function toggleLikeRecipe(recipeId) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const allRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];

    const recipeIdNumber = parseInt(recipeId);
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex === -1) return;

    const recipeIndex = allRecipes.findIndex(r => r.id === recipeIdNumber);
    if (recipeIndex === -1) return;

    const recipe = allRecipes[recipeIndex];
    const isLiked = currentUser.favoriteRecipes.includes(recipeIdNumber);

    const likeIcon = document.querySelector(".like-imgs");
    const quantityEl = document.querySelector(".quantitys");

    if (isLiked) {
        currentUser.favoriteRecipes = currentUser.favoriteRecipes.filter(id => id !== recipeIdNumber);
        users[userIndex].favoriteRecipes = users[userIndex].favoriteRecipes.filter(id => id !== recipeIdNumber);
        recipe.like = Math.max(0, recipe.like - 1);
        likeIcon.classList.remove("liked");
        likeIcon.textContent = "favorite_border";
    } else {
        currentUser.favoriteRecipes.push(recipeIdNumber);
        users[userIndex].favoriteRecipes.push(recipeIdNumber);
        recipe.like = (recipe.like || 0) + 1;
        likeIcon.classList.add("liked");
        likeIcon.textContent = "favorite";
    }

    if (quantityEl) {
        quantityEl.textContent = recipe.like;
    }

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("allRecipes", JSON.stringify(allRecipes));
}

function updateLikeButton(isLiked) {
    const likeIcon = document.querySelector(".like-imgs");
    if (isLiked) {
        likeIcon.classList.add("liked");
        likeIcon.textContent = "favorite";
    } else {
        likeIcon.classList.remove("liked");
        likeIcon.textContent = "favorite_border";
    }
}

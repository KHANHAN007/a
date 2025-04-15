function initRecipeAddModal() {
    const publishBtn = document.querySelector(".publish-btn");
    if (!publishBtn) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    const inputs = document.querySelectorAll(".basicInfor-element .element-content");
    if (currentUser && inputs.length >= 3) {
        inputs[2].value = currentUser.name;
    }
    const recipeImgBox = document.querySelector(".recipe-imgss");
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";
    imageInput.classList.add("image-upload");
    imageInput.style.display = "none";
    recipeImgBox.appendChild(imageInput);
    let uploadedImageURL = "";
    recipeImgBox.addEventListener("click", () => {
        imageInput.click();
    });
    imageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function (evt) {
                uploadedImageURL = evt.target.result;
                recipeImgBox.style.backgroundImage = `url(${uploadedImageURL})`;
            };
            reader.readAsDataURL(file);
        }
    });

    publishBtn.addEventListener("click", () => {
        const inputs = document.querySelectorAll(".basicInfor-element .element-content");
        const title = inputs[0].value.trim();
        const description = inputs[1].value.trim();
        const author = inputs[2].value.trim();
        const totalTime = inputs[3].value.trim();
        const prepTime = inputs[4].value.trim();
        const finalWeight = inputs[5].value.trim();
        const portions = Number(inputs[6].value.trim());

        if (!title || !description || !author || !totalTime || !prepTime || !finalWeight || !portions) {
            showErrorMessage("🚨 Please fill in all required fields!");
            return;
        }

        if (isNaN(totalTime) || isNaN(prepTime) || isNaN(finalWeight) || isNaN(portions)) {
            showErrorMessage("🚨 Time and portions must be valid numbers!");
            return;
        }
        const energy = Number(document.querySelector(".energy-container .value")?.textContent.trim()) || 0;
        const fat = Number(document.querySelector(".img1 .value")?.textContent.trim().replace("g", "")) || 0;
        const carb = Number(document.querySelector(".img2 .value")?.textContent.trim().replace("g", "")) || 0;
        const protein = Number(document.querySelector(".img3 .value")?.textContent.trim().replace("g", "")) || 0;
        const fiber = Number(document.querySelector(".img4 .value")?.textContent.trim().replace("g", "")) || 0;
        const dataNames = [];
        const ingredientsWithMass = [];
        const micronutrientsFromIngredients = [];
        const totalMicronutrients = {};
        document.querySelectorAll(".ingredients-elements .serving").forEach(el => {
            const name = el.getAttribute("data-name");
            const mass = el.getAttribute("data-mass");

            if (name && mass) {
                ingredientsWithMass.push({
                    name,
                    mass: Number(mass)
                });
            }

            if (name) {
                dataNames.push(name);
            }
        });
        console.log("Ingredients with mass:", ingredientsWithMass);
        dataNames.forEach(dataName => {
            const micronutrients = getMicronutrientsForIngredient(dataName);
            console.log("Micronutrients for", dataName, ":", micronutrients);
            for (const [key, value] of Object.entries(micronutrients)) {
                if (typeof value === "number") {
                    if (totalMicronutrients[key]) {
                        totalMicronutrients[key] += value;
                    } else {
                        totalMicronutrients[key] = value;
                    }
                }
            }
        });
        console.log("Total micronutrients:", totalMicronutrients);
        console.log("Ingredients:", dataNames);
        console.log("Micronutrients:", micronutrientsFromIngredients);

        const recipes = JSON.parse(localStorage.getItem("allRecipes")) || [];

        const newRecipe = {
            id: Date.now(),
            coverSrc: uploadedImageURL || "https://source.unsplash.com/600x400/?food,new",
            title,
            description,
            author,
            avatar: currentUser.avatar || "https://i.imgur.com/6VBx3io.png",
            totalTime,
            preparationTime: prepTime,
            finalWeight,
            portions,
            nutrient: {
                energy,
                fat,
                carb,
                protein,
                fiber
            },
            micronutrients: totalMicronutrients,
            ingredients: ingredientsWithMass,
            categories: ["My Recipes"],
            like: 0
        };
        recipes.push(newRecipe);
        localStorage.setItem("allRecipes", JSON.stringify(recipes));
        if (!currentUser.personalRecipes) currentUser.personalRecipes = [];
        currentUser.personalRecipes.push(newRecipe.id);
        users[userIndex] = currentUser;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        showSuccessMessage('🎉 Recipe created successfully!');

        setTimeout(() => {
            closeAddRecipeModal();
        }, 3000);
    });

    const toggleBtn = document.querySelector(".bosss .ttt");
    const addIngredientSection = document.querySelector(".addNewIngredient");

    if (toggleBtn && addIngredientSection) {
        toggleBtn.addEventListener("click", () => {
            addIngredientSection.scrollIntoView({ behavior: "smooth" });

            addIngredientSection.classList.toggle("active");

            if (addIngredientSection.classList.contains("active")) {
                toggleBtn.innerHTML = "keyboard_arrow_up";
                renderNutritionalInfo();
            } else {
                toggleBtn.innerHTML = "keyboard_arrow_down";
            }
        });
    }


}
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
const cookingMethods = [];

function attachEditButtonEvent(btn) {
    btn.addEventListener("click", () => {
        const methodEl = btn.closest(".method-element");
        const input = methodEl.querySelector(".texts");
        const newContent = input.value.trim();
        let errorMsg = methodEl.querySelector(".error-msg");
        if (!errorMsg) {
            errorMsg = document.createElement("div");
            errorMsg.classList.add("error-msg");
            errorMsg.style.color = "red";
            errorMsg.style.fontSize = "12px";
            errorMsg.style.marginTop = "4px";
            methodEl.appendChild(errorMsg);
        }

        if (!newContent) {
            showErrorMessage("You need to enter the content for the cooking step.");
            return;
        }
        errorMsg.textContent = "";
        const newStepId = cookingMethods.length + 1;
        cookingMethods.push({ id: newStepId, content: newContent });

        console.log("New content:", newContent);
        console.log("Updated cookingMethods:", cookingMethods);

        btn.style.display = "none";
        input.disabled = true;

        createNewMethodElement();
    });
}
function createNewMethodElement() {
    const methodList = document.querySelector(".method-list");
    const stepCount = methodList.querySelectorAll(".method-element").length + 1;

    const newMethodElement = document.createElement("div");
    newMethodElement.classList.add("method-element");

    const newStep = document.createElement("div");
    newStep.classList.add("step");
    newStep.textContent = `${stepCount}`;

    const newInput = document.createElement("input");
    newInput.classList.add("texts");
    newInput.placeholder = "Enter new method...";

    const newEditButton = document.createElement("div");
    newEditButton.classList.add("edit-btns");
    newEditButton.textContent = "edit";
    attachEditButtonEvent(newEditButton);

    newMethodElement.appendChild(newStep);
    newMethodElement.appendChild(newInput);
    newMethodElement.appendChild(newEditButton);
    methodList.appendChild(newMethodElement);
}

document.querySelectorAll(".edit-btns").forEach(attachEditButtonEvent);

function renderNutritionalInfo() {

    let currentPage = parseInt(localStorage.getItem("nutriCurrentPage")) || 1;
    const itemsPerPage = 5;
    const nutritionalList = document.querySelector(".nutritional-list");
    nutritionalList.innerHTML = "";

    const nutritionalData = JSON.parse(localStorage.getItem("ingredients")) || [];

    if (nutritionalData.length === 0) {
        nutritionalList.innerHTML = '<div class="no-data">No ingredients found</div>';
        return;
    }

    const totalPages = Math.ceil(nutritionalData.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = totalPages;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = nutritionalData.slice(startIndex, endIndex);
    console.log("Current page data:", currentPageData);
    currentPageData.forEach(data => {
        const ntriEle = document.createElement("div");
        ntriEle.classList.add("ntri-ele");

        const contentBox = document.createElement("div");
        contentBox.classList.add("content-boxx");

        const titleNtri = document.createElement("div");
        titleNtri.classList.add("title-ntir");
        titleNtri.innerHTML = `
            <div class="ntri-header">
                <div class="ntri-title">${data.name}</div>
                <div class="ntri-content">Community Recipes</div>
            </div>
            <div class="mass-gam">
                <div class="st">1</div>
                <div class="st-text">portion (${data.portionMass} grams)</div>
                <input class="gam" placeholder="0.00" type="text">
            </div>
        `;

        const valueBox = document.createElement("div");
        valueBox.classList.add("value-box");
        valueBox.innerHTML = `
            <div class="value-ele">
                <div class="Value">${data.macronutrients.energy}</div>
                <div class="Types">kcal</div>
            </div>
            <div class="value-ele">
                <div class="Value">${data.macronutrients.fat}</div>
                <div class="Types">g</div>
            </div>
            <div class="value-ele">
                <div class="Value">${data.macronutrients.carbohydrate}</div>
                <div class="Types">g</div>
            </div>
            <div class="value-ele">
                <div class="Value">${data.macronutrients.protein}</div>
                <div class="Types">g</div>
            </div>
        `;

        const btnAddNtri = document.createElement("div");
        btnAddNtri.classList.add("btn-add-ntri");
        btnAddNtri.innerText = "add";

        btnAddNtri.addEventListener("click", function () {
            const gamInput = ntriEle.querySelector(".gam");
            let errorDiv = gamInput.parentElement.querySelector(".error-inline");
            if (!errorDiv) {
                errorDiv = document.createElement("div");
                errorDiv.classList.add("error-inline");
                errorDiv.style.color = "red";
                errorDiv.style.fontSize = "13px";
                errorDiv.style.marginTop = "4px";
                gamInput.parentElement.appendChild(errorDiv);
            }

            const newMass = gamInput.value.trim();

            if (!newMass || isNaN(newMass) || parseFloat(newMass) <= 0) {
                errorDiv.textContent = "Vui lòng nhập số grams hợp lệ (lớn hơn 0)";
                return;
            } else {
                errorDiv.textContent = "";
            }

            const foodName = data.name || "Unnamed Food";
            console.log("Food name:", foodName);
            const ingredientsElements = document.createElement("div");
            ingredientsElements.classList.add("ingredients-elements");

            ingredientsElements.innerHTML = `
        <div class="element-box">
                 <div class="serving" data-name="${foodName}" data-mass="${newMass}">1 serving of ${foodName} (${newMass} grams)</div>
                <div class="add-box">
                <div class="btn-addfood">add</div>
                <div class="addContent">Add new food equivalent</div>
            </div>
        </div>
        <div class="remove-btn">delete</div>
    `;

            const targetContainer = document.querySelector(".opooo");
            if (targetContainer) {
                targetContainer.appendChild(ingredientsElements);

                ingredientsElements.querySelector(".remove-btn").addEventListener("click", () => {
                    ingredientsElements.remove();
                });

                ingredientsElements.querySelector(".btn-addfood").addEventListener("click", () => {
                    alert("Thêm food tương đương sẽ được xử lý sau!");
                });
            } else {
                console.error("Không tìm thấy .opooo để chèn phần tử mới!");
            }
        });


        contentBox.appendChild(titleNtri);
        contentBox.appendChild(valueBox);
        ntriEle.appendChild(contentBox);
        ntriEle.appendChild(btnAddNtri);

        nutritionalList.appendChild(ntriEle);
        const input = ntriEle.querySelector(".gam");
        input.addEventListener("input", function () {
            const portionMass = this.closest('.mass-gam').querySelector(".st-text");
            if (portionMass) {
                const newMass = this.value;
                const portionText = `${newMass} grams`;
                portionMass.innerText = `portion (${portionText})`;
            }
        });
    });

    renderNutriPagination(nutritionalData.length);
    function renderNutriPagination(totalItems) {
        const paginationContainer = document.querySelector(".paginations");
        if (!paginationContainer) {
            console.error("Pagination container not found!");
            return;
        }

        paginationContainer.innerHTML = "";

        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const currentPage = parseInt(localStorage.getItem("nutriCurrentPage")) || 1;


        const prevBtn = document.createElement("button");
        prevBtn.classList.add("prevs");
        prevBtn.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                localStorage.setItem("nutriCurrentPage", currentPage - 1);
                renderNutritionalInfo();
            }
        });
        paginationContainer.appendChild(prevBtn);


        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement("button");
            pageBtn.classList.add("pages");
            pageBtn.textContent = i;
            if (i === currentPage) pageBtn.classList.add("active");
            pageBtn.addEventListener("click", () => {
                localStorage.setItem("nutriCurrentPage", i);
                renderNutritionalInfo();
            });
            paginationContainer.appendChild(pageBtn);
        }


        const nextBtn = document.createElement("button");
        nextBtn.classList.add("nexts");
        nextBtn.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener("click", () => {
            if (currentPage < totalPages) {
                localStorage.setItem("nutriCurrentPage", currentPage + 1);
                renderNutritionalInfo();
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

}


function getMicronutrientsForIngredient(ingredientName) {

    const ingredients = JSON.parse(localStorage.getItem("ingredients"));
    console.log("Ingredients from anme:", ingredientName);
    if (!ingredients) {
        console.log("No ingredients found in localStorage.");
        return [];
    }


    const normalizedIngredientName = ingredientName.trim();

    console.log("Normalized ingredient name:", normalizedIngredientName);


    const ingredient = ingredients.find(item => item.name.includes(normalizedIngredientName));
    console.log("Ingredient found:", ingredient);
    if (ingredient) {
        console.log("Found ingredient:", ingredient);
        if (ingredient.micronutrients) {
            console.log("Micronutrients for", ingredientName, ":", ingredient.micronutrients);
            return ingredient.micronutrients;
        }
    } else {
        console.log("Ingredient not found:", ingredientName);
    }

    return [];
}

function calculateTotalMicronutrients(ingredientName) {
    const micronutrients = getMicronutrientsForIngredient(ingredientName);

    if (Object.keys(micronutrients).length === 0) {
        console.log("No micronutrients found for ingredient:", ingredientName);
        return {};
    }

    let totalMicronutrients = {};


    for (const [key, value] of Object.entries(micronutrients)) {
        if (typeof value === "number") {

            if (totalMicronutrients[key]) {
                totalMicronutrients[key] += value;
            } else {

                totalMicronutrients[key] = value;
            }
        }
    }

    console.log("Total micronutrients for", ingredientName, ":", totalMicronutrients);
    return totalMicronutrients;
}

function initFoodsCard() {
    const sampleFoods = [
        {
            id: 1,
            name: "Ackee, canned, drained",
            source: "Minh Cuong Tran",
            category: "Vegetables and Vegetable Products",
            quantity: "100g",
            macronutrients: {
                energy: 151,
                carbohydrate: 0.8,
                fat: 15.2,
                protein: 2.9
            },
            micronutrients: {
                cholesterol: 0.0,
                fiber: null,
                sodium: 240.0,
                water: 76.7,
                vitaminA: null,
                vitaminB6: 0.06,
                vitaminB12: 0.0,
                vitaminC: 30.0,
                vitaminD: 0.0,
                vitaminE: null,
                vitaminK: null,
                starch: 0.0,
                lactose: 0.0,
                alcohol: null,
                caffeine: null,
                sugars: 0.8,
                calcium: 35.0,
                iron: 0.7,
                magnesium: 40.0,
                phosphorus: 47.0,
                potassium: 270.0,
                zinc: 0.6,
                copper: 0.27,
                fluoride: null,
                manganese: null,
                selenium: null,
                thiamin: 0.03,
                riboflavin: 0.07,
                niacin: 0.6,
                pantothenicAcid: null,
                folateTotal: 41.0,
                folicAcid: null,
                fattyAcidsTrans: 0.0,
                fattyAcidsSaturated: null,
                fattyAcidsMonounsaturated: null,
                fattyAcidsPolyunsaturated: null,
                chloride: 340.0
            }
        },
        {
            id: 2,
            name: "Brown Rice, cooked",
            source: "USDA",
            category: "Cereal Grains and Pasta",
            quantity: "100g",
            macronutrients: { energy: 111, carbohydrate: 23, fat: 0.9, protein: 2.6 },
            micronutrients: { fiber: 1.8, magnesium: 44, phosphorus: 83, potassium: 86 }
        },
        {
            id: 3,
            name: "Almonds, raw",
            source: "FAO",
            category: "Nuts and Seeds",
            quantity: "100g",
            macronutrients: { energy: 579, carbohydrate: 21.6, fat: 49.9, protein: 21.2 },
            micronutrients: { calcium: 269, iron: 3.7, magnesium: 270, vitaminE: 25.6 }
        },
        {
            id: 4,
            name: "Avocado, raw",
            source: "USDA",
            category: "Fruits",
            quantity: "100g",
            macronutrients: { energy: 160, carbohydrate: 8.5, fat: 14.7, protein: 2 },
            micronutrients: { potassium: 485, vitaminC: 10, folateTotal: 81 }
        },
        {
            id: 5,
            name: "Beef, ground, 85% lean",
            source: "USDA",
            category: "Meat and Poultry",
            quantity: "100g",
            macronutrients: { energy: 250, carbohydrate: 0, fat: 20, protein: 17 },
            micronutrients: { iron: 2.6, zinc: 4.6, vitaminB12: 2.5 }
        },
        {
            id: 6,
            name: "Carrot, raw",
            source: "FAO",
            category: "Vegetables and Vegetable Products",
            quantity: "100g",
            macronutrients: { energy: 41, carbohydrate: 9.6, fat: 0.2, protein: 0.9 },
            micronutrients: { vitaminA: 835, vitaminK: 13.2, potassium: 320 }
        },
        {
            id: 7,
            name: "Cheddar Cheese",
            source: "USDA",
            category: "Dairy and Egg Products",
            quantity: "100g",
            macronutrients: { energy: 402, carbohydrate: 1.3, fat: 33.1, protein: 24.9 },
            micronutrients: { calcium: 721, vitaminA: 265, sodium: 621 }
        },
        {
            id: 8,
            name: "Eggplant, cooked",
            source: "Vietnam Nutrition",
            category: "Vegetables and Vegetable Products",
            quantity: "100g",
            macronutrients: { energy: 35, carbohydrate: 8.6, fat: 0.2, protein: 0.8 },
            micronutrients: { potassium: 123, fiber: 2.5 }
        },
        {
            id: 9,
            name: "Oats, rolled, dry",
            source: "USDA",
            category: "Cereal Grains and Pasta",
            quantity: "100g",
            macronutrients: { energy: 389, carbohydrate: 66.3, fat: 6.9, protein: 16.9 },
            micronutrients: { magnesium: 177, iron: 4.3, zinc: 3.6 }
        },
        {
            id: 10,
            name: "Orange, raw",
            source: "FAO",
            category: "Fruits",
            quantity: "100g",
            macronutrients: { energy: 47, carbohydrate: 11.8, fat: 0.1, protein: 0.9 },
            micronutrients: { vitaminC: 53.2, potassium: 181 }
        },
        {
            id: 11,
            name: "Peanut Butter, smooth",
            source: "USDA",
            category: "Legumes and Legume Products",
            quantity: "100g",
            macronutrients: { energy: 588, carbohydrate: 20, fat: 50, protein: 25 },
            micronutrients: { magnesium: 154, niacin: 13.7 }
        },
        {
            id: 12,
            name: "Pork Chop, grilled",
            source: "Vietnam Nutrition",
            category: "Meat and Poultry",
            quantity: "100g",
            macronutrients: { energy: 231, carbohydrate: 0, fat: 14, protein: 26 },
            micronutrients: { thiamin: 0.9, phosphorus: 250 }
        },
        {
            id: 13,
            name: "Strawberries, raw",
            source: "FAO",
            category: "Fruits",
            quantity: "100g",
            macronutrients: { energy: 32, carbohydrate: 7.7, fat: 0.3, protein: 0.7 },
            micronutrients: { vitaminC: 58.8, manganese: 0.4 }
        },
        {
            id: 14,
            name: "Tomato, raw",
            source: "USDA",
            category: "Vegetables and Vegetable Products",
            quantity: "100g",
            macronutrients: { energy: 18, carbohydrate: 3.9, fat: 0.2, protein: 0.9 },
            micronutrients: { vitaminC: 13.7, potassium: 237 }
        },
        {
            id: 15,
            name: "Tuna, canned in water",
            source: "FAO",
            category: "Fish and Seafood",
            quantity: "100g",
            macronutrients: { energy: 116, carbohydrate: 0, fat: 1, protein: 25 },
            micronutrients: { vitaminD: 2.0, selenium: 80 }
        },
        {
            id: 16,
            name: "Walnuts, raw",
            source: "USDA",
            category: "Nuts and Seeds",
            quantity: "100g",
            macronutrients: { energy: 654, carbohydrate: 13.7, fat: 65.2, protein: 15.2 },
            micronutrients: { omega3: 9.0, magnesium: 158 }
        },
        {
            id: 17,
            name: "Zucchini, cooked",
            source: "Vietnam Nutrition",
            category: "Vegetables and Vegetable Products",
            quantity: "100g",
            macronutrients: { energy: 17, carbohydrate: 3.1, fat: 0.3, protein: 1.2 },
            micronutrients: { vitaminC: 17.9, potassium: 261 }
        },
        {
            id: 18,
            name: "Cabbage, raw",
            source: "USDA",
            category: "Vegetables and Vegetable Products",
            quantity: "100g",
            macronutrients: { energy: 25, carbohydrate: 5.8, fat: 0.1, protein: 1.3 },
            micronutrients: { vitaminK: 76, vitaminC: 36.6 }
        },
        {
            id: 19,
            name: "Pumpkin, cooked",
            source: "FAO",
            category: "Vegetables and Vegetable Products",
            quantity: "100g",
            macronutrients: { energy: 20, carbohydrate: 4.9, fat: 0.1, protein: 0.7 },
            micronutrients: { vitaminA: 8513, potassium: 230 }
        },
        {
            id: 20,
            name: "Chickpeas, cooked",
            source: "USDA",
            category: "Legumes and Legume Products",
            quantity: "100g",
            macronutrients: { energy: 164, carbohydrate: 27.4, fat: 2.6, protein: 8.9 },
            micronutrients: { iron: 2.9, folateTotal: 172 }
        },
        {
            id: 21,
            name: "Cauliflower, boiled",
            source: "FAO",
            category: "Vegetables and Vegetable Products",
            quantity: "100g",
            macronutrients: { energy: 23, carbohydrate: 4.1, fat: 0.5, protein: 1.8 },
            micronutrients: { vitaminC: 44.3, choline: 44.3 }
        }

    ];
    if (!localStorage.getItem("foods")) {
        localStorage.setItem("foods", JSON.stringify(sampleFoods));
    }

    let foods = JSON.parse(localStorage.getItem("foods")) || [];
    let currentPage = parseInt(localStorage.getItem("currentFoodPage")) || 1;
    localStorage.setItem("currentFoodPage", currentPage);
    const itemsPerPage = 9;

    const foodList = document.querySelector(".food-list");
    const paginationContainer = document.querySelector(".pagination");
    const searchInput = document.querySelector(".search-food");
    const sortSelect = document.querySelectorAll(".category-filter")[0];
    const categorySelect = document.querySelectorAll(".category-filter")[1];

    const nutrientOptions = ["energy", "fat", "carbohydrate", "protein"];
    sortSelect.innerHTML = `<option value="all">All Nutrients</option>` +
        nutrientOptions.map(n => `<option value="${n}">${n.charAt(0).toUpperCase() + n.slice(1)}</option>`).join("");

    const categories = [...new Set(foods.map(f => f.category))].sort();
    categorySelect.innerHTML = `<option value="all">All Categories</option>` +
        categories.map(c => `<option value="${c}">${c}</option>`).join("");

    function renderPage(page) {
        const keyword = searchInput.value.trim().toLowerCase();
        const sortBy = sortSelect.value;
        const category = categorySelect.value;

        let filtered = foods.filter(f => f.name.toLowerCase().includes(keyword));
        if (category !== "all") filtered = filtered.filter(f => f.category === category);
        if (sortBy !== "all") {
            filtered.sort((a, b) => (b.macronutrients[sortBy] || 0) - (a.macronutrients[sortBy] || 0));
        }

        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        const start = (page - 1) * itemsPerPage;
        const paginatedFoods = filtered.slice(start, start + itemsPerPage);

        foodList.innerHTML = "";
        paginatedFoods.forEach(food => {
            const foodEl = document.createElement("div");
            foodEl.className = "food-element";
            foodEl.dataset.id = food.id;
            foodEl.innerHTML = `
                <div class="title-food">
                    <div class="cc">
                        <div class="title">${food.name}</div>
                        <span class="content">${food.source}</span>
                    </div>
                    <div class="tmop"></div>
                </div>
                <div class="information-food">
                    <div class="food-information"><div class="nutritional-value">${food.macronutrients.energy} kcal</div><div class="energy-type">Energy</div></div>
                    <div class="food-information"><div class="nutritional-value">${food.macronutrients.fat} g</div><div class="energy-type">Fat</div></div>
                    <div class="food-information"><div class="nutritional-value">${food.macronutrients.carbohydrate} g</div><div class="energy-type">Carbohydrate</div></div>
                    <div class="food-information"><div class="nutritional-value">${food.macronutrients.protein} g</div><div class="energy-type">Protein</div></div>
                </div>
            `;
            foodEl.addEventListener("click", () => showFoodInforModal(food));
            foodList.appendChild(foodEl);
        });

        const createBtn = document.createElement("div");
        createBtn.className = "food-element";
        createBtn.innerHTML = `
            <div class="btn-create">
                <div><img src="../assets/images/create.png" alt=""></div>
                <span>Create food</span>
            </div>
        `;
        foodList.appendChild(createBtn);
        renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
        paginationContainer.innerHTML = "";
        const createBtn = (html, disabled, onClick) => {
            const btn = document.createElement("button");
            btn.className = "page";
            btn.innerHTML = html;
            btn.disabled = disabled;
            btn.addEventListener("click", onClick);
            return btn;
        };

        paginationContainer.appendChild(createBtn('<i class="fa-solid fa-backward"></i>', currentPage === 1, () => {
            currentPage--;
            localStorage.setItem("currentFoodPage", currentPage);
            renderPage(currentPage);
        }));

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.className = `page ${i === currentPage ? "active" : ""}`;
            btn.textContent = i;
            btn.addEventListener("click", () => {
                currentPage = i;
                localStorage.setItem("currentFoodPage", currentPage);
                renderPage(currentPage);
            });

            paginationContainer.appendChild(btn);
        }

        paginationContainer.appendChild(createBtn('<i class="fa-solid fa-forward"></i>', currentPage === totalPages, () => {
            currentPage++;
            localStorage.setItem("currentFoodPage", currentPage);
            renderPage(currentPage);
        }));
    }

    searchInput.addEventListener("input", () => {
        currentPage = 1;
        renderPage(currentPage);
    });

    sortSelect.addEventListener("change", () => {
        currentPage = 1;
        renderPage(currentPage);
    });

    categorySelect.addEventListener("change", () => {
        currentPage = 1;
        renderPage(currentPage);
    });

    foodList.addEventListener("click", (e) => {
        if (e.target.closest(".btn-create")) {
            showAddFoodModal();
        }
    });

    renderPage(currentPage);
    window.initFoodsCard = initFoodsCard;
}



function replaceWithInput(el) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = el.className;
    input.placeholder = "Enter value";
    input.value = "";
    el.replaceWith(input);

    input.addEventListener("input", () => {
        const container = input.closest(".boxa")?.parentElement;
        const errorEl = container?.querySelector(".error-msg");
        if (errorEl) errorEl.style.display = "none";
    });
}

function showAddFoodModal() {
    fetch("../components/food-infor.html")
        .then(res => res.text())
        .then(html => {
            if (!document.querySelector('link[href="../css/food-infor.css"]')) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "../css/food-infor.css";
                document.head.appendChild(link);
            }

            const modalWrapper = document.createElement("div");
            modalWrapper.innerHTML = html;
            const modal = modalWrapper.querySelector(".foodInfor-container");
            modal.querySelector(".header-title").textContent = "Add new food";
            modal.querySelector(".describe").textContent = "Fill in the fields below with the food information";
            const overlay = document.createElement("div");
            overlay.className = "modal-overlay";
            overlay.style.display = "flex";
            overlay.style.alignItems = "flex-start";
            overlay.style.justifyContent = "center";
            overlay.style.padding = "40px 20px";
            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) overlay.remove();
            });
            modal.querySelectorAll(".content, .value, .micro-value").forEach(el => {
                const input = document.createElement("input");
                input.type = "text";
                input.className = el.className;
                input.placeholder = "Enter value";
                input.value = "";
                el.replaceWith(input);

                input.addEventListener("input", () => {
                    const container = input.closest(".boxa")?.parentElement;
                    const errorEl = container?.querySelector(".error-msg");
                    if (errorEl) errorEl.style.display = "none";
                });
            });
            modal.querySelector(".quantity-container .mass:nth-child(1)").textContent = "100";
            modal.querySelector(".quantity-container .mass:nth-child(2)").textContent = "grams";
            modal.querySelector(".btn-save").addEventListener("click", () => {
                modal.querySelectorAll(".error-msg").forEach(el => {
                    el.textContent = "";
                    el.style.display = "none";
                });

                let hasError = false;
                const showError = (input, message) => {
                    const container = input.closest(".boxa")?.parentElement;
                    const errorEl = container?.querySelector(".error-msg");
                    if (errorEl) {
                        errorEl.textContent = message;
                        errorEl.style.display = "block";
                        hasError = true;
                    }
                };

                const nameInput = modal.querySelectorAll(".preliminary-container input.content")[0];
                const sourceInput = modal.querySelectorAll(".preliminary-container input.content")[1];
                const categoryInput = modal.querySelectorAll(".preliminary-container input.content")[2];

                const name = nameInput.value.trim();
                const source = sourceInput.value.trim();
                const category = categoryInput.value.trim();

                const currentFoods = JSON.parse(localStorage.getItem("foods")) || [];
                const isDuplicate = currentFoods.some(f => f.name.toLowerCase() === name.toLowerCase());

                if (!name) {
                    showError(nameInput, "Name is required");
                } else if (isDuplicate) {
                    showError(nameInput, "This name already exists");
                }

                if (!source) showError(sourceInput, "Source is required");
                if (!category) showError(categoryInput, "Category is required");
                const macroInputs = modal.querySelectorAll(".maccro-container input.value");
                const [energyInput, fatInput, carbInput, proteinInput] = macroInputs;

                if (!energyInput.value.trim()) {
                    showError(energyInput, "Energy is required");
                } else if (isNaN(energyInput.value.trim())) {
                    showError(energyInput, "Energy must be a number");
                }

                if (fatInput.value.trim() && isNaN(fatInput.value.trim())) showError(fatInput, "Fat must be a number");
                if (carbInput.value.trim() && isNaN(carbInput.value.trim())) showError(carbInput, "Carb must be a number");
                if (proteinInput.value.trim() && isNaN(proteinInput.value.trim())) showError(proteinInput, "Protein must be a number");
                modal.querySelectorAll(".miccro-element").forEach(el => {
                    const input = el.querySelector("input.micro-value");
                    if (input && input.value.trim() !== "" && isNaN(input.value.trim())) {
                        showError(input, "Must be a number");
                    }
                });

                if (hasError) return;
                const quantity = "100grams";
                const macronutrients = {
                    energy: parseFloat(energyInput.value.trim()),
                    fat: parseFloat(fatInput.value) || 0,
                    carbohydrate: parseFloat(carbInput.value) || 0,
                    protein: parseFloat(proteinInput.value) || 0
                };

                const micronutrients = {};
                modal.querySelectorAll(".miccro-element").forEach(el => {
                    const key = el.querySelector(".micro-name").textContent
                        .toLowerCase().replace(/[\s,().\-]/g, "").replace("fattyacidstotal", "fattyAcids");
                    const input = el.querySelector("input.micro-value");
                    if (input && input.value.trim() !== "" && !isNaN(input.value.trim())) {
                        micronutrients[key] = parseFloat(input.value.trim());
                    }
                });

                const newFood = {
                    id: Date.now(),
                    name,
                    source,
                    category,
                    quantity,
                    macronutrients,
                    micronutrients
                };

                currentFoods.push(newFood);
                localStorage.setItem("foods", JSON.stringify(currentFoods));

                overlay.remove();
                initFoodsCard();
                showSuccessMessage("Food added successfully!");
            });
            modal.querySelector(".btn-cancel").addEventListener("click", () => overlay.remove());
            modal.querySelector(".btn-close").addEventListener("click", () => overlay.remove());
        })
        .catch(err => console.error("Lỗi khi load modal:", err));
}
function showFoodInforModal(food) {
    fetch("../components/food-infor.html")
        .then(res => res.text())
        .then(html => {
            if (!document.querySelector('link[href="../css/food-infor.css"]')) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "../css/food-infor.css";
                document.head.appendChild(link);
            }

            const modalWrapper = document.createElement("div");
            modalWrapper.innerHTML = html;
            const modal = modalWrapper.querySelector(".foodInfor-container");

            const overlay = document.createElement("div");
            overlay.className = "modal-overlay";
            overlay.style.cssText = `
                position: fixed;
                top: 0; left: 0;
                width: 100vw; height: 100vh;
                background: rgba(0,0,0,0.3);
                display: flex; align-items: center; justify-content: center;
                z-index: 999;
            `;

            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) overlay.remove();
            });

            overlay.appendChild(modal);
            modal.querySelectorAll(".preliminary-container .content")[0].textContent = food.name;
            modal.querySelectorAll(".preliminary-container .content")[1].textContent = food.source;
            modal.querySelectorAll(".preliminary-container .content")[2].textContent = food.category;

            const [mass, unit] = food.quantity.split(/(?<=\d)(?=\D)/);
            modal.querySelector(".quantity-container .mass:nth-child(1)").textContent = mass.trim();
            modal.querySelector(".quantity-container .mass:nth-child(2)").textContent = unit.trim();
            const macro = food.macronutrients;
            const macroEls = modal.querySelectorAll(".maccro-container .nutri-container");
            macroEls[0].querySelector(".value").textContent = macro.energy ?? "";
            macroEls[1].querySelector(".value").textContent = macro.fat ?? "";
            macroEls[2].querySelector(".value").textContent = macro.carbohydrate ?? "";
            macroEls[3].querySelector(".value").textContent = macro.protein ?? "";
            const micro = food.micronutrients || {};
            modal.querySelectorAll(".miccro-element").forEach(el => {
                const key = el.querySelector(".micro-name").textContent
                    .toLowerCase().replace(/\s|,|\(|\)|-/g, "").replace("fattyacidstotal", "fattyAcids");
                el.querySelector(".micro-value").textContent = micro[key] ?? "";
            });

            const btnSave = modal.querySelector(".btn-save");
            btnSave.textContent = "Edit";

            let isEditing = false;

            btnSave.addEventListener("click", () => {
                if (!isEditing) {
                    isEditing = true;
                    btnSave.textContent = "Save and close";
                    modal.querySelectorAll(".nutri-container .value, .miccro-element .micro-value").forEach(el => {
                        const input = document.createElement("input");
                        input.type = "text";
                        input.className = el.className;
                        input.value = el.textContent.trim();
                        el.replaceWith(input);

                        input.addEventListener("input", () => {
                            const error = input.closest(".boxa")?.parentElement?.querySelector(".error-msg");
                            if (error) error.style.display = "none";
                        });
                    });
                } else {
                    modal.querySelectorAll(".error-msg").forEach(e => {
                        e.textContent = "";
                        e.style.display = "none";
                    });

                    let hasError = false;

                    function showError(input, message) {
                        const error = input.closest(".boxa")?.parentElement?.querySelector(".error-msg");
                        if (error) {
                            error.textContent = message;
                            error.style.display = "block";
                            hasError = true;
                        }
                    }

                    const macroInputs = modal.querySelectorAll(".nutri-container input.value");
                    const [energyInput, fatInput, carbInput, proteinInput] = macroInputs;

                    if (!energyInput.value.trim()) showError(energyInput, "Energy is required");
                    else if (isNaN(energyInput.value.trim())) showError(energyInput, "Must be a number");

                    if (fatInput.value.trim() && isNaN(fatInput.value.trim())) showError(fatInput, "Must be a number");
                    if (carbInput.value.trim() && isNaN(carbInput.value.trim())) showError(carbInput, "Must be a number");
                    if (proteinInput.value.trim() && isNaN(proteinInput.value.trim())) showError(proteinInput, "Must be a number");
                    modal.querySelectorAll(".miccro-element").forEach(el => {
                        const input = el.querySelector("input.micro-value");
                        if (input && input.value.trim() !== "" && isNaN(input.value.trim())) {
                            showError(input, "Must be a number");
                        }
                    });

                    if (hasError) return;

                    const macronutrients = {
                        energy: parseFloat(energyInput.value.trim()),
                        fat: parseFloat(fatInput.value) || 0,
                        carbohydrate: parseFloat(carbInput.value) || 0,
                        protein: parseFloat(proteinInput.value) || 0
                    };

                    const micronutrients = {};
                    modal.querySelectorAll(".miccro-element").forEach(el => {
                        const key = el.querySelector(".micro-name").textContent
                            .toLowerCase().replace(/\s|,|\(|\)|-/g, "").replace("fattyacidstotal", "fattyAcids");
                        const input = el.querySelector("input.micro-value");
                        if (input && input.value.trim() !== "" && !isNaN(input.value.trim())) {
                            micronutrients[key] = parseFloat(input.value.trim());
                        }
                    });

                    const foods = JSON.parse(localStorage.getItem("foods")) || [];
                    const updated = foods.map(f => f.id === food.id ? {
                        ...f,
                        macronutrients,
                        micronutrients
                    } : f);

                    localStorage.setItem("foods", JSON.stringify(updated));
                    overlay.remove();
                    initFoodsCard();
                    showSuccessMessage("Food updated successfully!");
                }
            });

            modal.querySelector(".btn-close").addEventListener("click", () => overlay.remove());
            modal.querySelector(".btn-cancel").addEventListener("click", () => overlay.remove());

            document.body.appendChild(overlay);
        })
        .catch(err => console.error("Lỗi khi load modal:", err));
}

function showSuccessMessage(message) {
    let successBox = document.querySelector(".success-mess");

    if (!successBox) {
        return setTimeout(() => showSuccessMessage(message), 100);
    }

    const content = successBox.querySelector(".content-succes");
    content.textContent = message;

    successBox.classList.add("show");

    setTimeout(() => {
        successBox.classList.remove("show");
    }, 3000);
}

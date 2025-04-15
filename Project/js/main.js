(function checkLogin() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const publicPages = ["login.html", "register.html"];
    const isPublic = publicPages.some(page => window.location.pathname.includes(page));

    if (!currentUser && !isPublic) {
        window.location.href = "../pages/login.html";
    }
})();

function checkLogin() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        window.location.href = "../pages/login.html";
    }
    return currentUser;
}

document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const view = searchParams.get("view");
    loadComponent("../components/sidebar.html", "sidebar-container", function () {
        highlightActiveNav();
        restoreSidebarState();

        const signOutBtn = document.querySelector("#sign-out-btn");
        if (signOutBtn) {
            signOutBtn.addEventListener("click", function (e) {
                e.preventDefault();
                localStorage.removeItem("currentUser");
                window.location.href = "../pages/login.html";
            });
        }
    });

    loadComponent("../components/navbar.html", "navbar-container", function () {
        fillUserName();
        loadNavbarScript();
        updateNavbarTitle();
    });
    if (document.getElementById("foods-card")) {
        loadComponent("../components/foods-card.html", "foods-card", function () {
            loadScript("../js/foods-card.js", function () {
                if (typeof initFoodsCard === "function") {
                    initFoodsCard();
                }
            });
        });
    }    loadScript("../js/data.js", function () {
        if (path.includes("dashboard.html")) {
            loadComponent("../components/recipe-dashboard.html", "recipe-dashboard", function () {
                loadScript("../js/dashboard.js", function () {
                    if (typeof initRecipeDashboard === "function") {
                        initRecipeDashboard();
                    }
                });
            });
        }
        if (path.includes("recipe-list.html")) {
            loadComponent("../components/recipe-card.html", "recipe-card", function () {
                loadScript("../js/recipe-list.js", function () {
                    if (typeof initRecipeList === "function") {
                        initRecipeList();
                    }
                });
            });
        }
    });
    if (view === "account") {
        loadComponent("../components/account.html", "account", function () {
            loadScript("../js/account.js", function () {
                if (typeof initAccount === "function") {
                    initAccount();
                }
            });
        });
    }    if (document.getElementById("demo")) {
        loadComponent("../components/recipe-infor.html", "demo", function () {
            loadScript("../js/recipe-infor.js", initRecipeChart);
        });
    }
});

function loadComponent(url, containerId, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = data;
                requestAnimationFrame(() => {
                    if (callback) callback();
                });
            }
        })
        .catch(error => console.error(`Error loading ${url}:`, error));
}



function loadScript(src, onloadCallback) {
    const timestamp = new Date().getTime();
    const fullSrc = `${src}?v=${timestamp}`;

    const script = document.createElement("script");
    script.src = fullSrc;
    script.type = "text/javascript";

    script.onload = () => {
        console.log(`[loadScript] Script ${src} đã load xong.`);
        if (onloadCallback) onloadCallback();
    };

    script.onerror = () => {
        console.error(`[loadScript] Lỗi khi load ${src}`);
    };

    document.body.appendChild(script);
}


function highlightActiveNav() {
    let currentPath = window.location.pathname.split("/").pop();
    let links = document.querySelectorAll(".container-list a");
    links.forEach(link => {
        let linkPath = link.getAttribute("href").split("/").pop();
        link.classList.toggle("active", currentPath === linkPath);
    });
}

function loadNavbarScript() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const nameEl = document.getElementById("username-placeholder");
    if (user && nameEl) {
        nameEl.textContent = user.name;
    }
    const accountBtn = document.querySelector(".account");
    if (accountBtn) {
        accountBtn.addEventListener("click", () => {
            window.location.href = "../pages/home.html?view=account";
        });
    }
    const avatarEl = document.querySelector(".navbar .account .avatar");
    if (user && avatarEl) {
        avatarEl.style.backgroundImage = `url(${user.avatar || "https://i.imgur.com/6VBx3io.png"})`;
        avatarEl.style.backgroundSize = "cover";
        avatarEl.style.backgroundPosition = "center";
        avatarEl.style.borderRadius = "50%";
    }

    let menuToggle = document.getElementById("menu-toggle");
    let sidebar = document.getElementById("sidebar-container");
    let navbar = document.querySelector(".navbar");
    let mainContent = document.querySelector(".main-content");
    let logo = document.querySelector(".logo");
    let overlays = document.querySelectorAll(".overlay");
    let linkpages = document.querySelectorAll(".linkpage");
    let signOut = document.querySelector(".sign-out");

    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", function () {
            sidebar.classList.toggle("active");
            navbar.classList.toggle("full-width");
            mainContent.classList.toggle("full-width");
            signOut.classList.toggle("minactive");
            if (logo) logo.classList.toggle("minactive");
            overlays.forEach(overlay => overlay.classList.toggle("minactive"));
            linkpages.forEach(linkpage => linkpage.classList.toggle("minactive"));
            saveSidebarState(sidebar, logo, overlays, linkpages, signOut, navbar, mainContent);
        });
    } else {
        console.error("Menu toggle button not found!");
    }

}

function saveSidebarState(sidebar, logo, overlays, linkpages, signOut, navbar, mainContent) {
    const state = {
        sidebarActive: sidebar.classList.contains("active"),
        logoMinactive: logo?.classList.contains("minactive"),
        overlaysMinactive: Array.from(overlays).map(o => o.classList.contains("minactive")),
        linkpagesMinactive: Array.from(linkpages).map(l => l.classList.contains("minactive")),
        signOutMinactive: signOut?.classList.contains("minactive"),
        navbarFullWidth: navbar.classList.contains("full-width"),
        mainContentFullWidth: mainContent.classList.contains("full-width")
    };
    localStorage.setItem("sidebarState", JSON.stringify(state));
}

function restoreSidebarState() {
    const state = JSON.parse(localStorage.getItem("sidebarState"));
    if (!state) return;

    const sidebar = document.getElementById("sidebar-container");
    const logo = document.querySelector(".logo");
    const overlays = document.querySelectorAll(".overlay");
    const linkpages = document.querySelectorAll(".linkpage");
    const signOut = document.querySelector(".sign-out");
    const navbar = document.querySelector(".navbar");
    const mainContent = document.querySelector(".main-content");

    if (state.sidebarActive) sidebar.classList.add("active");
    if (state.logoMinactive && logo) logo.classList.add("minactive");
    if (state.signOutMinactive && signOut) signOut.classList.add("minactive");

    overlays.forEach((overlay, i) => {
        if (state.overlaysMinactive[i]) overlay.classList.add("minactive");
    });
    linkpages.forEach((linkpage, i) => {
        if (state.linkpagesMinactive[i]) linkpage.classList.add("minactive");
    });

    if (state.navbarFullWidth) navbar.classList.add("full-width");
    if (state.mainContentFullWidth) mainContent.classList.add("full-width");
}

function initRecipeChart() {
    const canvas = document.getElementById('nutritional-value-chart');
    if (!canvas) {
        console.warn('Canvas not found, cannot draw chart.');
        return;
    }
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Fat', 'Carbohydrate', 'Protein'],
            datasets: [{
                data: [38.3, 48.9, 12.8],
                backgroundColor: ['#e74c64', '#eca37e', '#1abc9c']
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 13,
                        boxHeight: 13,
                        color: '#000',
                        font: {
                            family: 'Inter',
                            size: 15,
                            weight: '400',
                            lineHeight: 1.5
                        }
                    }
                },
                datalabels: {
                    formatter: value => `${value}%`,
                    color: '#fff',
                    font: {
                        lineHeight: 1.5,
                        family: 'Inter',
                        size: 13
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}
function fillUserName() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const userNameEl = document.querySelector("#navbar-container .account .content");
    if (user && user.name && userNameEl) {
        userNameEl.textContent = user.name;
    }
}
function updateNavbarTitle() {
    const path = window.location.pathname;

    const titleEl = document.querySelector(".typeOfPage .title");
    const contentEl = document.querySelector(".typeOfPage .content");

    if (!titleEl || !contentEl) return;

    if (path.includes("food-list.html")) {
        titleEl.textContent = "Food databases";
        contentEl.textContent = "Create, check and update foods that you can use on meal plans";
    } else if (path.includes("recipe-list.html")) {
        titleEl.textContent = "Recipes";
        contentEl.textContent = "Create, check and update recipes";
    } else if (path.includes("dashboard.html")) {
        titleEl.textContent = "Favorite Recipes";
        contentEl.textContent = "Your saved recipes appear here";
    } else {
        titleEl.textContent = "Nutrium";
        contentEl.textContent = "Welcome to your personalized dashboard";
    }
}

const API_URL = "/api/products";

const loginSection = document.getElementById("login-section");
const showroomSection = document.getElementById("showroom-section");
const loginForm = document.getElementById("login-form");
const loginButton = loginForm.querySelector('button[type="submit"]');
const logoutButton = document.getElementById("logout-button");
const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("car-search");

let allCars = [];

function openShowroom(event) {
    if (event) event.preventDefault();

    const name = document.getElementById("login-name").value.trim();
    const email = document.getElementById("login-email").value.trim();

    if (!name || !email) {
        alert("Please enter your name and email.");
        return;
    }

    loginSection.hidden = true;
    showroomSection.hidden = false;
    loadCars();
}

loginForm.addEventListener("submit", openShowroom);
loginButton.addEventListener("click", openShowroom);

logoutButton.addEventListener("click", () => {
    showroomSection.hidden = true;
    loginSection.hidden = false;
    loginForm.reset();
});

async function loadCars() {
    productsContainer.textContent = "Loading our premium cars...";

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Unable to load cars");

        allCars = await response.json();
        displayCars(allCars);
    } catch (error) {
        console.error(error);
        productsContainer.textContent =
            "Unable to load cars. Please check the backend server.";
    }
}

function displayCars(cars) {
    productsContainer.innerHTML = "";

    if (!cars.length) {
        productsContainer.textContent = "No cars found.";
        return;
    }

    cars.forEach(car => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${car.image}" alt="${car.name}"
                 style="width:100%;height:190px;object-fit:cover;border-radius:7px;">
            <h3>${car.name}</h3>
            <p><strong>Price:</strong> ₹${car.price.toLocaleString("en-IN")}</p>
            <p><strong>Category:</strong> ${car.category}</p>
            <button class="shop-button view-details" type="button">VIEW DETAILS</button>
        `;

        card.querySelector(".view-details").addEventListener("click", () => {
            showCarDetails(car);
        });

        productsContainer.appendChild(card);
    });
}

searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();

    displayCars(allCars.filter(car =>
        car.name.toLowerCase().includes(term) ||
        car.category.toLowerCase().includes(term)
    ));
});
function showCarDetails(car) {
    const modal = document.createElement("div");

    const firstColor = car.colors[0];
    const firstImage = car.colorImages?.[firstColor] || car.image;

    modal.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,.9);
        display:flex;justify-content:center;align-items:center;
        padding:20px;z-index:9999;overflow-y:auto;
    `;

    modal.innerHTML = `
        <div style="background:#171717;color:white;padding:25px;
             max-width:550px;width:100%;border:1px solid #d4af37;
             border-radius:12px;max-height:90vh;overflow-y:auto;">

            <img id="car-detail-image" src="${firstImage}" alt="${car.name}"
                 style="width:100%;height:230px;object-fit:cover;border-radius:8px;">

            <h2 style="color:#d4af37;margin-top:20px;">${car.name}</h2>
            <p>${car.description}</p>
            <hr style="margin:15px 0;border-color:#555;">
            <p><strong>Price:</strong> ₹${car.price.toLocaleString("en-IN")}</p>
            <p><strong>Category:</strong> ${car.category}</p>
            <p><strong>Year:</strong> ${car.year}</p>
            <p><strong>Fuel:</strong> ${car.fuel}</p>
            <p><strong>Transmission:</strong> ${car.transmission}</p>

            <h3 style="color:#d4af37;margin-top:20px;">Available Colours</h3>

            <select id="car-colour" style="width:100%;padding:12px;margin:12px 0;
                 background:#252525;color:white;border:1px solid #d4af37;">
                ${car.colors.map(color =>
                    `<option value="${color}">${color}</option>`
                ).join("")}
            </select>

            <p id="selected-colour" style="color:#d4af37;">
                Selected colour: ${firstColor}
            </p>

            <button id="close-details" class="shop-button" type="button">CLOSE</button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#car-colour").addEventListener("change", function () {
        const selectedColor = this.value;
        const imageUrl = car.colorImages?.[selectedColor] || car.image;

        modal.querySelector("#car-detail-image").src = imageUrl;

        modal.querySelector("#selected-colour").textContent =
            "Selected colour: " + selectedColor;
    });

    modal.querySelector("#close-details").addEventListener("click", () => modal.remove());

    modal.addEventListener("click", event => {
        if (event.target === modal) modal.remove();
    });
}

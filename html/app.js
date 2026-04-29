// ===================== NAVBAR =====================
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".navbar-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!toggleBtn || !navLinks) return;

    toggleBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        toggleBtn.classList.toggle("open"); // animate hamburger
    });

    // Close menu when any nav link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            toggleBtn.classList.remove("open");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
            navLinks.classList.remove("active");
            toggleBtn.classList.remove("open");
        }
    });
});

// ===================== SIGN UP =====================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const surname = document.getElementById("surname").value.trim();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        const dobSelects = document.querySelectorAll(".dob select");
        const month = dobSelects[0].value;
        const day = dobSelects[1].value;
        const year = dobSelects[2].value;

        if (!name || !surname || !username || !email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (!month || !day || !year) {
            alert("Please select your full date of birth.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.find(user => user.email === email);

        if (userExists) {
            alert("An account with this email already exists.");
            return;
        }

        users.push({
            name,
            surname,
            username,
            email,
            password,
            dob: `${day} ${month} ${year}`
        });

        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created successfully!");
        window.location.href = "index.html";
    });
}

// ===================== LOGIN =====================
const loginForm = document.getElementById("login");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("user").value.trim();
        const password = document.getElementById("pass").value.trim();

        if (!username || !password) {
            alert("Please enter username and password.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const foundUser = users.find(
            user => user.username.toLowerCase() === username.toLowerCase()
        );

        if (!foundUser) {
            alert("User not found. Please sign up first.");
            return;
        }

        if (foundUser.password !== password) {
            alert("Incorrect password.");
            return;
        }

        alert("Login successful! Welcome " + foundUser.name);

        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

        window.location.href = "Home.html";
    });
}

// ===================== CART =====================

const cartIcon = document.querySelector("#cart-icon");
const cartBox = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
const cartContent = document.querySelector(".cart-content");

if (cartIcon && cartBox && cartClose) {
    cartIcon.addEventListener("click", () => cartBox.classList.add("active"));
    cartClose.addEventListener("click", () => cartBox.classList.remove("active"));
}

//------------ADD To Cart ---------------\
const buttons = document.querySelectorAll(".addToCart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (buttons.length > 0 && cartContent) {

    buttons.forEach(button => {
        button.addEventListener("click", () => {

            const productCard = button.closest(".product-card");
            const name = productCard.querySelector("h3").innerText;
            const price = productCard.querySelector("p").innerText;
            const imgSrc = productCard.querySelector("img").src;

            cart.push({ name, price, imgSrc });
            localStorage.setItem("cart", JSON.stringify(cart));

            addToCartUI(name, price, imgSrc);
            
            // this auti-opnes the cart
            if (cartBox) cartBox.classList.add("active");
        });
    });

}

// ===================== ADD TO CART UI =====================
function addToCartUI(name, price, imgSrc) {

    if (!cartContent) return;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-box");

    cartItem.innerHTML = `
        <img src="${imgSrc}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${name}</h2>
            <span class="cart-price">${price}</span>
            <div class="cart-quantity">
                <button class="decrement">-</button>
                <span class="number">1</span>
                <button class="increment">+</button>
            </div>
        </div>
        <i class="bx bx-trash cart-remove"></i>
    `;

    cartContent.appendChild(cartItem);

    updateTotal();
}

// ===================== REMOVE ITEM =====================
if (cartContent) {
    const box = e.target.closest(".cart-box");
    if (!box) return;

    const numberE1 = box.querySelector("number");
    let qty = parseInt(numberE1.innerText);

    if (e.target.classList.contains("increment")) {
        numberE1.innerText = qty + 1;
        updateTotal();
    }

    if (e.target.classList.contains("decremnt")) {
        if (qty > 1) {
            numberE1.innerText = qty - 1;
        }
        updateTotal();
    }

    if (e.target.classList.contains("cart-remove")) {
        box.remove();
        updateTotal();
    }
    
}
// ===================== TOTAL =====================
function updateTotal() {

    if (!cartContent) return;

    const cartBoxes = document.querySelectorAll(".cart-box");
    let total = 0;

    cartBoxes.forEach(box => {
        const priceText = box.querySelector(".cart-price").innerText.replace("R", "");
        const quantity = box.querySelector(".number").innerText;

        total += parseFloat(priceText) * parseInt(quantity);
    });

    const totalElement = document.querySelector(".total-price");
    if (totalElement) {
        totalElement.innerText = "R" + total.toFixed(2);
    }
}

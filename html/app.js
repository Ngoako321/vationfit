const toggleBtn = document.querySelector(".navbar-toggle");
const navLinks = document.getElementById("navLinks");
const signupForm = document.getElementById("signupForm");

const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault(); // stop page refresh

        // Get all values
        const name = document.getElementById("name").value.trim();
        const surname = document.getElementById("surname").value.trim();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        // Get DOB values
        const dobSelects = document.querySelectorAll(".dob select");
        const month = dobSelects[0].value;
        const day = dobSelects[1].value;
        const year = dobSelects[2].value;

        // Validation
        if (!name || !surname || !username || !email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (month === "Month" || day === "Day" || year === "Year") {
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

        // Check if user already exists
        let users = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.find(user => user.email === email);

        if (userExists) {
            alert("An account with this email already exists.");
            return;
        }

        // Create user object
        const newUser = {
            name,
            surname,
            username,
            email,
            password,
            dob: `${day} ${month} ${year}`
        };

        // Save user
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // Success
        alert("Account created successfully!");

        // Redirect to login page
        window.location.href = "index.html";
    });
}

toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

links.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

const buttons = document.querySelectorAll(".addToCart");

let cart = [];

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));

        cart.push({ name, price });

        console.log("Cart:", cart);
        alert(`${name} added to cart`);
    });
});
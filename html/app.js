const toggleBtn = document.querySelector(".navbar-toggle");
const navLinks = document.getElementById("navLinks");

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
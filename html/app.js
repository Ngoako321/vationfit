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
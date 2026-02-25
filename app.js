function toggleMenu(hamburger) {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');   // Slide menu in/out
}


const buttons = document.querySelectorAll("addToCart");

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        alert("Item added to cart!");
    });
});

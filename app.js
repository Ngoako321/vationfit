function toggleMenu(hamburger) {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');   // Slide menu in/out
}


document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let username = document.getElementById("username").value;

    let month = document.getElementById("month").value;
    let day = document.getElementById("day").value;
    let year = document.getElementById("year").value;

    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if(name === ""  || surname === "" || username === ""){
        alert("Please fill in all fields");
        return;
    }

    if (month === "" || day === "" || year === ""){
        alert("Please select your date of birth");
        return;
    }

    if(password !== confirmPassword){
        alert("Passwords do not match");
        return;
    }

    alert("Account created successfully!")
    window.location.href = "index.html";
});
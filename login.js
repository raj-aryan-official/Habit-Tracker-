let loginbtn = document.getElementById("login_btn");
let SignUpPage = document.getElementById("signup");
let loginPage = document.getElementById("login");
let signupbtn = document.getElementById("signup_btn");
let registerbtn = document.getElementById("registerbtn");
let forgotPasswordBtn = document.getElementById("forgot_password_btn");
let loginSubmitBtn = document.querySelector('#login form button');

loginbtn.addEventListener('click', (e) => {
    SignUpPage.style.display = 'none';
    loginPage.style.display = 'block';
});

signupbtn.addEventListener('click', (e) => {
    SignUpPage.style.display = 'block';
    loginPage.style.display = 'none';
});

registerbtn.addEventListener('click', (e) => {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (localStorage.getItem(email)) {
        alert("User registered already");
        return;
    }
    localStorage.setItem(email, password);
    alert("New user registered");
    SignUpPage.style.display = 'none';
    loginPage.style.display = 'block';
});

forgotPasswordBtn.addEventListener('click', (e) => {
    let email = prompt("Please enter your registered email:");
    if (localStorage.getItem(email)) {
        alert("Your password is: " + localStorage.getItem(email));
    } else {
        alert("This email is not registered.");
    }
});

loginSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let emailLogin = document.getElementById("email_login").value;
    let passwordLogin = document.getElementById("password_login").value;

    if (localStorage.getItem(emailLogin) === passwordLogin) {
        alert("Login successful!");
        window.location.href = "habittracker.html";
    } else {
        alert("Incorrect email or password.");
    }
});

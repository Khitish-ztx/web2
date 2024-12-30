let pop = document.querySelector(".pop");
let popbtn = document.querySelector("#popbtn");
let user = document.getElementById("username");
let pass = document.getElementById("password");
let userError = document.getElementById("userError");
let passError = document.getElementById("passError");
const realuser=1234
const realpass=69


function login() {
    let hasError = false;

    if (user.value.trim() === '') {
        userError.style.display = "block";
        userError.innerHTML = "This field is required";
        hasError = true;
    } else {
        userError.style.display = "none";
    }

    if (pass.value.trim() === '') {
        passError.style.display = "block";
        passError.innerHTML = "This field is required";
        hasError = true;
    } else {
        passError.style.display = "none";
    }

    if (hasError) {
        return;
    }

    if (user.value == realuser && pass.value == realpass) {
        pop.style.visibility = "visible";
        popbtn.addEventListener("click", function() {
            window.location = "sample.html";
            pop.style.visibility = "hidden";
            
        });
    } 
    else {
        let popitem = document.querySelector("#popmsg");
        let tickplay = document.querySelector(".play");
        tickplay.innerHTML = "<h1 style='color:red;'> Error Fetching data!! <h1>";
        popitem.innerHTML = "Incorrect username and password for this Account";
        popbtn.innerHTML = "Try Again";
        pop.style.visibility = "visible";
        popbtn.addEventListener("click", function() {
            window.location = "login.html";
        });
    }
}
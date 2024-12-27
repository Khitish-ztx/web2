

let realuser=1234;
let realpass=1234;

function login(){
    let user=document.getElementById("username").value
    let pass=document.getElementById("password").value
    let pop=document.querySelector(".pop")
    let popbtn=document.querySelector("#popbtn")
    if(user==realuser && pass==realpass){
        pop.style.visibility="visible"
        popbtn.addEventListener("click",function(){
            window.location="sample.html"

        })




        
    }
    else{
        let popitem=document.querySelector("#popmsg")
        let tickplay=document.querySelector("#play")
        tickplay.innerHTML="<h1 color='red'> Error Fetching data!! <h1>"
        popitem.innerHTML="Incorrect userame and password for this Account"
        popbtn.innerHTML="Try Again"
        pop.style.visibility="visible"
        popbtn.addEventListener("click",function(){
            window.location="login.html"
            
        })

        
    }
}
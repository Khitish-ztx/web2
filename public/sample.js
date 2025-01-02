setTimeout(function(){
    let u=document.querySelector(".pop")
    let b=document.querySelector("#popbtn")
    u.style.visibility="hidden"
    
    

},1400)
const vid=document.querySelector("#vid");
vid.addEventListener("play",function(){
    if(vid.requestFullscreen){
        vid.requestFullscreen();
    }

});

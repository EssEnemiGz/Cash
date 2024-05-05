
// HTML CONTENT
fetch("/static/components/header.html").then(response => response.text()).then(data => {
    document.querySelector(".header").innerHTML = data;
});

// DEPENDENCIES LOADER
document.addEventListener("DOMContentLoaded", function(){
    head = document.querySelector("head");
    fetch("/static/components/dependencies.html").then(response => response.text()).then(data => {
        head.innerHTML += "\n";
        head.innerHTML += data;
    });
});

// HTML CONTENT
document.addEventListener("DOMContentLoaded", function () {
    fetch("/static/templates/components/header.html").then(response => response.text()).then(data => {
        document.querySelector(".header").innerHTML = data;
    });

    // DEPENDENCIES LOADER
    head = document.querySelector("head");
    fetch("/static/templates/components/dependencies.html").then(response => response.text()).then(data => {
        head.innerHTML += "\n";
        head.innerHTML += data;
    });
});

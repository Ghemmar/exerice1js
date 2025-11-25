document.getElementById("txt").onchange = function() {
    let message = document.getElementById("message");
    if (this.value == "Salut") {
        message.textContent = "Texte correct !";
        message.style.color = "green";
    } else{
        message.textContent = "Incorrect !";
        message.style.color = "red";
    }
}
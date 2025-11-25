function actualiserHeure() {
    let maintenant = new Date();
    document.getElementById("clock").textContent = String(maintenant.getHours()).padStart(2, '0')
    + ":" + String(maintenant.getMinutes()).padStart(2, '0') + ":" +
     String(maintenant.getSeconds()).padStart(2, '0');

}

setInterval(actualiserHeure, 1000);
actualiserHeure();

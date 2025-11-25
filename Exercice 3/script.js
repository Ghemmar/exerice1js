document.getElementById("euro").onkeyup = function () {
    let eu = parseFloat(this.value);
    if (!isNaN(eu)) {
        document.getElementById("dollar").value = (eu*1.16).toFixed(2);

    }
};

document.getElementById("dollar").onkeyup = function () {
    let dol = parseFloat(this.value);
    if (!isNaN(dol)) {
        document.getElementById("euro").value = (dol/1.16).toFixed(2);

    }
};
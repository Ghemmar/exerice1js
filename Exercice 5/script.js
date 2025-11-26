function ajouter() {
    let texte = document.getElementById("tache").value;
    if (texte.trim() == "");

    //créer li
    let li = document.createElement("li");

    //créer chockbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    //cocher et décocher
    checkbox.onchange = function () {
        if (this.checked) {
            span.classList.add("done");
        } else {
            span.classList.remove("done");
        }
    };

    //créer le texte de la tache
    let span = document.createElement("span");
    span.textContent = " " + texte;

    li.appendChild(checkbox);
    li.appendChild(span);

    document.getElementById("liste").appendChild(li);
    document.getElementById("tache").value = "";


};


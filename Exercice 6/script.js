
// Variables
let secret = '';
let longueur = 4;
let essais = 0;

// DOM
const niveauSelect = document.getElementById('niveau');
const nouveauBtn = document.getElementById('Demarrer');
const validerBtn = document.getElementById('valider');
const revealerBtn = document.getElementById('revealer');
const inputProp = document.getElementById('proposition');
const historyDiv = document.getElementById('history');
const compteurSpan = document.getElementById('compteur');
const messageDiv = document.getElementById('message');

//démarrer
function demarrerNouvellePartie() {
    longueur = parseInt(niveauSelect.value, 10);
    secret = genererSecret(longueur);
    essais = 0;

    // vider l'historique
    historyDiv.innerHTML = '';
    compteurSpan.textContent = essais;
    inputProp.value = '';
    inputProp.disabled = false;
    validerBtn.disabled = false;
    messageDiv.textContent = `Partie démarrée — Devinez un nombre de ${longueur} chiffres tous différents.`;

    // "Afficher secret"
    console.log('secret ->', secret);
}

//  secret 
function genererSecret(n) {
    const chiffres = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let res = '';


    // Mélanger et prendre 
    for (let i = 0; i < n; i++) {

        // choisir 
        const idx = Math.floor(Math.random() * chiffres.length);
        res += chiffres[idx];


        // retirer ce chiffre
        chiffres.splice(idx, 1);
    }
    return res;
}

// Valider
function traiterProposition() {
    const prop = inputProp.value.trim();

    // Vérifie
    if (prop.length !== longueur) {
        messageDiv.textContent = `Erreur : la proposition doit contenir exactement ${longueur} chiffres.`;
        return;
    }
    if (!/^[0-9]+$/.test(prop)) {
        messageDiv.textContent = `Erreur : n'utilisez que des chiffres (0-9).`;
        return;
    }


    // Vérifier qu'il n'y a pas de répétition de chiffres
    const set = new Set(prop.split(''));
    if (set.size !== prop.length) {
        messageDiv.textContent = 'Erreur : les chiffres doivent tous être différents.';
        return;
    }


    // Tout est valide
    essais += 1;
    compteurSpan.textContent = essais;

    const resultat = compterTaureauxVaches(secret, prop);
    ajouterHistorique(prop, resultat.taureaux, resultat.vaches);



    // Message court
    messageDiv.textContent = `Résultat : ${resultat.taureaux} Taureau(s), ${resultat.vaches} Vache(s).`;



    // Vérifier la victoire
    if (resultat.taureaux === longueur) {
        messageDiv.textContent = `Bravo ! Vous avez trouvé le nombre ${secret} en ${essais} tentative(s).`;


        // bloquer saisie jusqu'à démarrer
        inputProp.disabled = true;
        validerBtn.disabled = true;
    }



    // préparer l'input pour la prochaine saisie
    inputProp.value = '';
    inputProp.focus();
}



// Compter taureaux et vaches
function compterTaureauxVaches(secretStr, propStr) {
    let taureaux = 0;
    let vaches = 0;
    for (let i = 0; i < secretStr.length; i++) {
        if (propStr[i] === secretStr[i]) {
            taureaux += 1;
        } else if (secretStr.indexOf(propStr[i]) !== -1) {
            vaches += 1;
        }
    }
    return { taureaux, vaches };
}

// Ajouter une ligne
function ajouterHistorique(prop, taureaux, vaches) {
    const ligne = document.createElement('div');
    ligne.className = 'row';
    ligne.innerHTML = `
        <div style="width:110px;font-weight:700">${prop}</div>
        <div class="small">Taureaux: <span class="good">${taureaux}</span></div>
        <div class="small">Vaches: <span class="bad">${vaches}</span></div>`;

    // Ajouter en haut
    historyDiv.insertBefore(ligne, historyDiv.firstChild);
}


// Afficher secret
function afficherSecret() {
    alert('Secret : ' + secret);
}

// Écouteurs d'événements
nouveauBtn.addEventListener('click', demarrerNouvellePartie);
validerBtn.addEventListener('click', traiterProposition);
revealerBtn.addEventListener('click', afficherSecret);



// Permettre l'envoi avec la touche Entrée
inputProp.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        traiterProposition();
    }
});


// Démarrer une partie automatiquement au chargement
demarrerNouvellePartie();

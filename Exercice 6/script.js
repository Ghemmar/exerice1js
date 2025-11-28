

let secret = '';
let longueur = 4;
let essais = 0;


const niveauSelect = document.getElementById('niveau');
const nouveauBtn = document.getElementById('Demarrer');
const validerBtn = document.getElementById('valider');
const revealerBtn = document.getElementById('revealer');
const inputProp = document.getElementById('proposition');
const historyDiv = document.getElementById('history');
const compteurSpan = document.getElementById('compteur');
const messageDiv = document.getElementById('message');


function demarrerNouvellePartie() {
    longueur = parseInt(niveauSelect.value, 10);
    secret = genererSecret(longueur);
    essais = 0;

    historyDiv.innerHTML = '';
    compteurSpan.textContent = essais;
    inputProp.value = '';
    inputProp.disabled = false;
    validerBtn.disabled = false;
    messageDiv.textContent = `Partie démarrée — Devinez un nombre de ${longueur} chiffres tous différents.`;


    console.log('secret ->', secret);
}


function genererSecret(n) {
    const chiffres = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let res = '';



    for (let i = 0; i < n; i++) {


        const idx = Math.floor(Math.random() * chiffres.length);
        res += chiffres[idx];



        chiffres.splice(idx, 1);
    }
    return res;
}


function traiterProposition() {
    const prop = inputProp.value.trim();

    if (prop.length !== longueur) {
        messageDiv.textContent = `Erreur : la proposition doit contenir exactement ${longueur} chiffres.`;
        return;
    }
    if (!/^[0-9]+$/.test(prop)) {
        messageDiv.textContent = `Erreur : n'utilisez que des chiffres (0-9).`;
        return;
    }


    const set = new Set(prop.split(''));
    if (set.size !== prop.length) {
        messageDiv.textContent = 'Erreur : les chiffres doivent tous être différents.';
        return;
    }

    essais += 1;
    compteurSpan.textContent = essais;

    const resultat = compterTaureauxVaches(secret, prop);
    ajouterHistorique(prop, resultat.taureaux, resultat.vaches);


    messageDiv.textContent = `Résultat : ${resultat.taureaux} Taureau(s), ${resultat.vaches} Vache(s).`;


    if (resultat.taureaux === longueur) {
        messageDiv.textContent = `Bravo ! Vous avez trouvé le nombre ${secret} en ${essais} tentative(s).`;
        inputProp.disabled = true;
        validerBtn.disabled = true;
    }

    inputProp.value = '';
    inputProp.focus();
}


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


function ajouterHistorique(prop, taureaux, vaches) {
    const ligne = document.createElement('div');
    ligne.className = 'row';
    ligne.innerHTML = `
        <div style="width:110px;font-weight:700">${prop}</div>
        <div class="small">Taureaux: <span class="good">${taureaux}</span></div>
        <div class="small">Vaches: <span class="bad">${vaches}</span></div>`;
    historyDiv.insertBefore(ligne, historyDiv.firstChild);
}

nouveauBtn.addEventListener('click', demarrerNouvellePartie);
validerBtn.addEventListener('click', traiterProposition);
inputProp.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        traiterProposition();
    }
});
demarrerNouvellePartie();

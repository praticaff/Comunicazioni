const comuniData = [
    { comune: "Milano", provincia: { sigla: "MI" }, cap: ["20121", "20122"], codiceCatastale: "F205" },
    { comune: "Roma", provincia: { sigla: "RM" }, cap: ["00100"], codiceCatastale: "H501" }
];

/*CODICE PER COMPILAZIONE DATI MINORI*/

const selezioneMinori = document.getElementById('registrazioneMinorenni');
const formMinori = document.getElementById('datiMinorenne');
const minorenne1 = document.getElementById('minorenne1');
const minorenne2 = document.getElementById('minorenne2');
const minorenne3 = document.getElementById('minorenne3');
const pulisci1 = minorenne1.querySelectorAll('input');
const pulisci2 = minorenne2.querySelectorAll('input');
const pulisci3 = minorenne3.querySelectorAll('input');

selezioneMinori.addEventListener('change', function () {
    if (this.value === 'NO') {
        pulisci1.forEach(pulisci1 => pulisci1.value = '');
        pulisci2.forEach(pulisci2 => pulisci2.value = '');
        pulisci3.forEach(pulisci3 => pulisci3.value = '');
        datiMinorenne.style.display = 'none';
    }
    else {
        datiMinorenne.style.display = 'grid';
    }
    if (this.value === '1') {
        minorenne1.style.display = 'grid';
        pulisci2.forEach(pulisci2 => pulisci2.value = '');
        pulisci3.forEach(pulisci3 => pulisci3.value = '');
        minorenne2.style.display = 'none';
        minorenne3.style.display = 'none';
    }
    if (this.value === '2') {
        minorenne1.style.display = 'grid';
        minorenne2.style.display = 'grid';
        pulisci3.forEach(pulisci3 => pulisci3.value = '');
        minorenne3.style.display = 'none';
    }
    if (this.value === '3') {
        minorenne1.style.display = 'grid';
        minorenne2.style.display = 'grid';
        minorenne3.style.display = 'grid';
    }

});

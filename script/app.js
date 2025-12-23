/*CODICE PER IL CALCOLO DEL CODICE CATASTALE*/
let comuni = [];

// fetch per leggere il JSON
fetch("comuni.json")
  .then(response => response.json())
  .then(data => {
    comuni = data;
  })
  .catch(error => console.error("Errore nel caricamento del JSON:", error));

// Prendi i riferimenti agli input
const inputComune = document.getElementById("comune");
const inputCodice = document.getElementById("codice");

// Aggiungi un evento al campo comune
inputComune.addEventListener("blur", () => {
  const nomeComune = inputComune.value.trim().toLowerCase();

  // Cerca il comune nel JSON
  const comuneTrovato = comuni.find(c => c.nome.toLowerCase() === nomeComune);

  if (comuneTrovato) {
    inputCodice.value = comuneTrovato.codiceCatastale || "";
  } else {
    inputCodice.value = "Comune non trovato";
  }
});

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

//SEZIONE PER MOSTRARE O NASCONDERE LA CASELLA DELEGATO

const checkbox = document.getElementById('consegnaDelegato');//definisce la checkbox
const section = document.getElementById('delegato');//definisce quale sezione nascondere

checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    section.style.display = 'block'; // mostra la sezione
  } else {
    section.style.display = 'none';  // nasconde la sezione
  }
});

//CALCOLO CODICE FISCALE

function calcolaCF() {
  const nome = document.getElementById("nome").value.toUpperCase();
  const cognome = document.getElementById("cognome").value.toUpperCase();
  const data = document.getElementById("dataNascita").value;
  const sesso = document.getElementById("sesso").value;
  const comune = document.getElementById("comune").value;

  if (!nome || !cognome || !data) return;

  // Funzione per estrarre le lettere del CF dal nome/cognome
  function estraiLettere(str, tipo) {
    const consonanti = str.replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/gi, "");
    const vocali = str.replace(/[^AEIOU]/gi, "");
    let res = "";

    if (tipo === "cognome") {
      res = (consonanti + vocali + "XXX").substring(0, 3);
    } else if (tipo === "nome") {
      if (consonanti.length >= 4) {
        // Prendi 1° 3° 4° consonante
        res = consonanti[0] + consonanti[2] + consonanti[3];
      } else {
        res = (consonanti + vocali + "XXX").substring(0, 3);
      }
    }
    return res;
  }

  const cognomeCF = estraiLettere(cognome, "cognome");
  const nomeCF = estraiLettere(nome, "nome");

  // Data e sesso
  const [anno, mese, giorno] = data.split("-");
  const annoCF = anno.slice(-2);

  const mesi = ["A","B","C","D","E","H","L","M","P","R","S","T"];
  const meseCF = mesi[parseInt(mese)-1];

  let giornoCF = parseInt(giorno);
  if (sesso === "F") giornoCF += 40;
  giornoCF = giornoCF.toString().padStart(2, "0");

  // CF senza carattere di controllo
  let cfParziale = cognomeCF + nomeCF + annoCF + meseCF + giornoCF + comune;

  // Calcolo carattere di controllo
  const dispari = {
    '0':1,'1':0,'2':5,'3':7,'4':9,'5':13,'6':15,'7':17,'8':19,'9':21,
    'A':1,'B':0,'C':5,'D':7,'E':9,'F':13,'G':15,'H':17,'I':19,'J':21,
    'K':2,'L':4,'M':18,'N':20,'O':11,'P':3,'Q':6,'R':8,'S':12,'T':14,
    'U':16,'V':10,'W':22,'X':25,'Y':24,'Z':23
  };
  const pari = {
    '0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,
    'A':0,'B':1,'C':2,'D':3,'E':4,'F':5,'G':6,'H':7,'I':8,'J':9,
    'K':10,'L':11,'M':12,'N':13,'O':14,'P':15,'Q':16,'R':17,'S':18,'T':19,
    'U':20,'V':21,'W':22,'X':23,'Y':24,'Z':25
  };
  const tabControllo = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let somma = 0;
  for (let i=0; i<cfParziale.length; i++) {
    const c = cfParziale[i];
    somma += (i % 2 === 0) ? dispari[c] : pari[c];
  }

  const carattereControllo = tabControllo[somma % 26];

  const cfCompleto = cfParziale + carattereControllo;

  document.getElementById("codiceFiscale").value = cfCompleto;
}

// Event listener
["nome","cognome","dataNascita","sesso","comune"].forEach(id => {
  document.getElementById(id).addEventListener("input", calcolaCF);
  document.getElementById(id).addEventListener("change", calcolaCF);
});

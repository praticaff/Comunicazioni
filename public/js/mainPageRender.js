//RENDER DEL MENU' PRATICHE CON LE RISPETTIVE FUNZIONI. VIENE AVVIATO CON IL LOGIN E CARICA IL CODICE ALL'INTERNO DELLA MAINVIEWS

//const accediButton=document.getElementById("accediButton");
//accediButton.addEventListener("click", async ()=>{await unmount(); await render(); await init(); await renderMenu() });

import { pratiche } from './pratiche.js';
import * as menu from "./menu.js"; //importo tutte le funzioni da menu.js e gli assegno l'alias menu
import {injectionMainCss} from "./stylePagina.js";

//==========================================================================================================
//DICHIARAZIONE VARIABILI
//==========================================================================================================
let userIcon;
let userMenu;
let settings;
let settingsMenu;
let backHome;
let content
let elencoPratiche;
let submenu;
let subTitolo;
let subImg;
let subButton;


//==========================================================================================================
//1 - FUNZIONE RENDER DELLA PAGINA PRINCIPALE, richiama la injectionStyleOnce per ricreare il codice CSS, rimosso con l'UNMOUNT. Importa la mainViews.js
//==========================================================================================================

async function render (){
	injectionMainCss()
	const divBody=document.getElementById("divBody");
	try {
	const rsHtml=await fetch("./js/mainViews.js");
	
	if(!rsHtml.ok){
			throw new Error (`Errore HTTP: ${rsHtml.status}`);
	}
	const html=await rsHtml.text();
	divBody.innerHTML= html;
	}
	catch (errore){
	console.error ("Errore durante il caricamento del file:", errore);
	}
}

//==========================================================================================================
//2 - FUNZIONE INIT - PRENDE I RIFERIMENTI DEL DOM iniettati con la render dal mainViews
//==========================================================================================================

async function init(){
userIcon=document.getElementById ("userIcon");
userMenu=document.getElementById ("userMenu");
settings=document.getElementById ("settings");
settingsMenu=document.getElementById("settingsMenu");
content=document.getElementById("content");
submenu=document.getElementById("submenu");
subTitolo=document.getElementById("subTitolo");
subImg=document.getElementById("subImg");
subButton=document.getElementById("subButton");//TASTO NUOVA PRATICA

userMenu.addEventListener ("click", menu.apriMenuUtente);
settings.addEventListener ("click", menu.apriMenuImpostazioni);

}

//==========================================================================================================
//3 - RENDER MENU' - render principale del menu' sinistra con l'elenco delle pratiche disponibili
//==========================================================================================================

async function renderMenu (){
	
	const elencoPratiche=document.createElement("ul"); //CREAZIONE DEL UL PRINCIPALE
	elencoPratiche.className="elencoPratiche";
	elencoPratiche.id="elencoPratiche";
	
	pratiche.forEach((pratica)=>{ //ESEGUE IL CODICE PER OGNI ELEMENTO DELL'ARRAY PRATICHE
	
		//====================================
        // PRATICA CON SOTTOVOCI
        //====================================
		if (pratica.sottovoce) {
			//====================================
			// CREA ELEMENTO "LI" CHE CONTERRA' I DUE DIV DELLA LABEL E DELLE PRATICHE
			//====================================
			const ufficioConSottovoci = document.createElement ("li");
			ufficioConSottovoci.className="ufficioConSottovoci";
			
			const divTestoConSottovoci= document.createElement ("div");
			divTestoConSottovoci.className="divTestoConSottovoci";
			const testoUfficio=document.createTextNode (pratica.label);
			divTestoConSottovoci.appendChild(testoUfficio)
			
			const divPraticheUfficio= document.createElement ("div");
			divPraticheUfficio.className="divPraticheUfficio";
			
			const praticheUfficio=document.createElement("ul"); //CREO L'UL CHE CONTERRA' LE SOTTOVOCI
			praticheUfficio.className="praticheUfficio";
			
			pratica.sottovoce.forEach((sottovoce)=>{ //ESEGUE IL CODICE PER OGNI SOTTOVOCE
			
				const sottovoceUfficio = document.createElement ("li");//CREA LA SOTTOVOCE
				sottovoceUfficio.className="sottovoceUfficio";
				
				const divIconaSottovoce=document.createElement("div");
				divIconaSottovoce.className="divIconaSottovoce";
				
				const icona=document.createElement("img");
				icona.className="iconaSottovoce";
				icona.src = sottovoce.icona;
				
				divIconaSottovoce.appendChild(icona);
				
				const divTestoSottovoce=document.createElement("div");
				divTestoSottovoce.className="divTestoSottovoce";
				const testo=document.createTextNode(sottovoce.label); //ASSEGNA ALLA SOTTOVOCE LA RELATIVA LABEL
				
				
				divTestoSottovoce.appendChild(testo);
				
				sottovoceUfficio.appendChild(divIconaSottovoce);				//=======================================================
				sottovoceUfficio.appendChild(divTestoSottovoce);				//APPENDO ALLA SOTTOVOCE L'ICONA E LA LABEL E GLI ASSEGNO IL CLICK PER IL RENDER ALLA SOTTOVOCE
				sottovoceUfficio.addEventListener ("click", ()=> menu.menuPratica(sottovoceUfficio)); //=================================
																	
				praticheUfficio.appendChild (sottovoceUfficio); //APPENDO LE SOTTOVOCI (ICONA +LABEL) ALL'UL praticheUfficio
			});
						
			divPraticheUfficio.appendChild(praticheUfficio); //APPENDO AL DIV UFFICIO L'UL CON LE SOTTOVOCI
			ufficioConSottovoci.appendChild(divTestoConSottovoci); //APPENDO AL LI IL DIV CHE CONTIENE LE SOTTOVOCI
			ufficioConSottovoci.appendChild(divPraticheUfficio);
			elencoPratiche.appendChild(ufficioConSottovoci); //APPENDO il LI (comprensivo di tutte le sottovoci) AL UL PRINCIPALE (elencoPratiche)
		}
		//====================================
        // PRATICA SENZA SOTTOVOCI
        //====================================
		
		else {
			const ufficioSenzaSottovoci = document.createElement ("li");
			ufficioSenzaSottovoci.className="ufficioSenzaSottovoci";//UFFICIO UNIRA' ICONA E TESTO IN MODO DA ASSEGNARGLI UNA CLASSE E IMPOSTARE REGOLE SIA SUL TESTO CHE SULL'ICONA
			
			const divIcona= document.createElement ("div");
			divIcona.className="divIcona";
			
			const icona = document.createElement("img");
			icona.className="icona";
			icona.src = pratica.icona; //SI AGGIUNGER .SRC PERCHE E' UNA PROPRIETA HTML CHE CARICA UNA RISORSA ESTERNA NELLA VARIABILE
			divIcona.appendChild(icona);
			
			const divTesto= document.createElement ("div");
			divTesto.className="divTestoSenzaSottovoci";
			const testo=document.createTextNode (pratica.label); //.createTextNode AGGIUNGE IL TESTO
			divTesto.appendChild(testo);
			

			ufficioSenzaSottovoci.appendChild(divIcona);
			ufficioSenzaSottovoci.appendChild(divTesto);
			ufficioSenzaSottovoci.addEventListener ("click", ()=> menu.menuPratica(ufficioSenzaSottovoci)); //GLI PASSO UFFICIO COME VARIABILE PERCHE' SERVIRA' PER RECUPERARNE LA LABEL DOPO
			
			elencoPratiche.appendChild(ufficioSenzaSottovoci); //APPENDO il LI AL UL PRINCIPALE (elencoPratiche)
		}
	});
	
	divElencoPratiche.appendChild(elencoPratiche); //APPENDO TUTTO L'UL AL DIV (divElencoPratiche)
}



export async function startHomePage() {
	await render(); await init(); await renderMenu()
};

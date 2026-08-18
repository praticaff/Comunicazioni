import { pratiche } from './pratiche.js';
import * as stylePagina from "./stylePagina.js";


//==========================================================================================================
//MENU' UTENTE
//==========================================================================================================
export function apriMenuUtente(){
	if (userMenu.style.display === "block"){
		userMenu.style.display = "none";}
	else {	
		settingsMenu.style.display="none";
		userMenu.style.display = "block";}
}

//==========================================================================================================
//MENU' IMPOSTAZIONI
//==========================================================================================================
export function apriMenuImpostazioni(){
	const isOpen=window.getComputedStyle(settingsMenu).display==="block";//VERSIONE ALTERNATIVA DEL CODICE SOPRA
	
	userMenu.style.display="none";
	settingsMenu.style.display=isOpen ? "none" : "block";
}

//==========================================================================================================
// MENU' PRATICA - dopo aver cliccato la voce del menu' fa il render della barra superiore e del content con i dati gia' presenti in tabella
//==========================================================================================================

export function menuPratica(li){
subTitolo.innerHTML="";
divContent.innerHTML="";

const render=li.textContent;

pratiche.forEach((pratica)=>{
	if (pratica.sottovoce){
		pratica.sottovoce.forEach((sottovoce)=>{
			if (render===sottovoce.label){
				const menu =`${pratica.label} / ${sottovoce.label}`;
				subTitolo.innerHTML=menu;
				const aggiornaModulo=async()=> {
					const modulo= await sottovoce.testoRicerca();
					divContent.innerHTML=modulo.html||"";
				};
				aggiornaModulo();
				subButton.onclick=() =>nuovaPratica(sottovoce,render);
			}
		})
	}
	else{
	if(render===pratica.label){
		const menu=pratica.label;
		subTitolo.innerHTML=menu;
		const aggiornaModulo=async()=> {
			const modulo=await pratica.testoRicerca();
			divContent.innerHTML=modulo.html||"";
		};
		aggiornaModulo();
		subButton.onclick =() =>nuovaPratica(pratica,render);
		}
	}
});
subButton.style="display:flex";
}

//==========================================================================================================
// NUOVA PRATICA - dopo aver cliccato sul bottone nuova pratica, fa il render del content (main)
// gli passo "li"(voce o sottovoce dell'elenco pratiche) e il "rendermenu" (recupera l'etichetta di quella voce di menu)
//==========================================================================================================

export function nuovaPratica(li,renderMenu){
divContent.innerHTML="";				
const render =renderMenu;
divContent.innerHTML=render;

pratiche.forEach((pratica)=>{
	if (render===pratica.label){
		const aggiornaModulo=async()=> {
			const modulo= await pratica.testo();
			divContent.innerHTML=modulo.html||"";
			stylePagina.injectionStyleNuovaPratica()
		};
		aggiornaModulo();
		}
		
	else if (pratica.sottovoce){
		 pratica.sottovoce.forEach((sottovoce)=>{
		 if (render===sottovoce.label){
			const aggiornaModulo=async()=> {
				const modulo= await sottovoce.testo();
				divContent.innerHTML=modulo.html||"";
				stylePagina.injectionStyleNuovaPratica()
		};
		aggiornaModulo();}
		});
		}
});
}


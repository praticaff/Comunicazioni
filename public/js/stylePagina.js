//==========================================================================================================
//FUNZIONE  PER L'INJECT DEL CSS. Fa l'unmount di tutto il css presente e ricarica il file main.css
//==========================================================================================================

export async function injectionMainCss(){
	if (document.getElementById("mainCss")){
		return;
	};

	const rsCss=await fetch ("./css/main.css");
	if (!rsCss.ok){
	 throw new error ("Errore nella richiesta del file css main");
	}
	else{
	const link=document.createElement("link");//se non viene trovato lo crea

	link.id="mainCss"; //gli assegno l'id
	link.href="./css/main.css";
	link.rel="stylesheet";
			
	document.head.appendChild(link);//appende il figlio (link) all'head
	}
}


export async function injectionStyleNuovaPratica(){
	if (document.getElementById("nuovaPraticaCss")){
		return;
	};

	document.getElementById("cercaPraticaCss")?.remove();//se trova il css del cerca pratica lo elimina prima di creare il nuovo css
	
	const rsCss =await fetch ("./css/nuovaPratica.css");
	if (!rsCss.ok){
		throw new error ("Errore nella richiesta del file css nuovaPratica");
	}
	else{
		
		const css=await rsCss.text();
		const nuovaPraticaCss=document.createElement("style");
		
		nuovaPraticaCss.id="nuovaPraticaCss";
		nuovaPraticaCss.textContent=css;
		
		document.head.appendChild (nuovaPraticaCss);
	}
}

export async function injectionStyleCercaPratica(){
	if (document.getElementById("cercaPraticaCss")){
		return;
	};

	document.getElementById("nuovaPraticaCss")?.remove();//se trova il css della nuova pratica lo elimina prima di creare il nuovo css
	
	const rsCss =await fetch ("./css/cercaPratica.css");
	if (!rsCss.ok){
		throw new error ("Errore nella richiesta del file css cercaPratica");
	}
	else{
		
		const css=await rsCss.text();
		const cercaPraticaCss=document.createElement("style");
		
		cercaPraticaCss.id="cercaPraticaCss";
		cercaPraticaCss.textContent=css;
		
		document.head.appendChild (cercaPraticaCss);
	}
}
//====================================================================================================
//INIZIALIZZAZIONE CLERK
//====================================================================================================
//
// index - Clerk.js - auth.js - authController.js - authService.js - authRepository.js
//
// La index.html contiene il file clerk.js che viene eseguito al caricamento della pagina.
// Clerk.js avvia la fetch /me (contentuta in auth.js) che usa il middleware di clerk e poi avvia authController.me
// La funziona me di authController.js impacchetta i dati dell'utente (clerk) e li invia al authService.js
// AuthService.js esegue la logica applicativa e chiama l'authRepository per cercare l'utente nel db e gli enti associti.
// se authRepository non trova l'utente lo crea nel db. Poi retituisce le informazioni al service.
// Il service a sua volta le comunica al controller che crea il file res.json e lo invia la clerk.js:
//
//   nessun ente collegato -> messaggio di errore
//   un solo ente collegato -> avvia la home page (startHomePage della mainPageRender.js)
//   più enti collegati -> avvia la funzione avviaSelezioneEnte:
//
// avviaSelezioneEnte crea nella index i tasti con gli enti disponibili e al click dell'ente avvia la fetch /selezionaEnte (contentuta in auth.js)
// avviaSelezioneEnte invia nel body della fetch l'id dell'ente selezionato.
// la fetch avvia authController.selezionaEnte che a sua volta chiama authService.selezionaEnte
// questt'ultima chiama la verificaAppartenenzaEnte per verificare che l'utente sia associato all'ente selezionato (è una verifica di sicurezza, gia lo sappiamo)
// se il controllo è andata a buon fine crea la sessione nel db e resitusice ok in res.json (gestito sempre da selezionaEnte.js)



//continiare in selazioneEnte.js la parte che riceve il json e impostare e gestire l'avvio della sessione (clerk lo puo fare in teoria)
// con quell'id user e l'id ente
//continaure quindi la parte di avvio della home page come utente autentica e collegato a quell'ente
// poi capire e colleagre il discorso matricola

window.addEventListener("load", async () => {

    const isLocal=window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";

    if (isLocal){
        console.log("Ambiente locale, Clerk disattivato");

        const { startHomePage } = await import("./mainPageRender.js");
        await startHomePage();

        return;
    }

    await Clerk.load();
	console.log("clerk.js caricato");
    if (Clerk.user) { //Verifica se è già attiva la sessione

        console.log(Clerk.user);
		console.log("Prima della fetch");
		
        const response = await fetch("/me");//Chiede le informazioni dell'utente attualmente autenticato tramite la rotta nel file auth.js
		console.log("Dopo la fetch", response.status);
		
        if (response.ok) {

            if(response.messaggio){//se l'utente non ha ancora enti associati comunica il messaggio (contatta Amm.re)
                console.log("Messaggio dal backend:", response.messaggio);
                const resLogin= document.getElementById("resLogin");
                resLogin.textContent = response.messaggio;
            } else{
                if (response.richiestaSelezioneEnte===false) {
                    console.log("L'utente appartiene ad un solo ente attivo, procedo con la home page");
                    const { startHomePage } = await import("./mainPageRender.js");
                    await startHomePage();
                } else{
                    console.log("L'utente appartiene a più enti, procedo con la selzione dell'ente");
                    const resEnti=response.enti;
                    console.log("gli enti della response sono:", resEnti)

                    const {avviaSelezioneEnte} = await import("./selezionaEnte.js");
                    await avviaSelezioneEnte(resEnti);//avvio la funzione per la selezione dell'ente passando l'array degli enti attivi dell'utente
                }
            }
			
        } 
    } else {

        console.log("Utente non autenticato");
        Clerk.redirectToSignIn();
    }
});
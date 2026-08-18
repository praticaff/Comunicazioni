//====================================================================================================
// INIZIALIZZAZIONE CLERK - Verifica se è già attiva la sessione
//====================================================================================================
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
    if (Clerk.user) {

        console.log(Clerk.user);
		console.log("Prima della fetch");
		
        const response = await fetch("/me");//Chiede le informazioni dell'utente attualmente autenticato tramite la rotta nel file auth.js
		console.log("Dopo la fetch", response.status);
		
        if (response.ok) {
			
			const data1 = await response.text();//prova
            console.log("prova - Backend conferma utente:", data1);//prova

            //const data = await response.json();
            //console.log("Backend conferma utente:", data);
			
            const { startHomePage } = await import("./mainPageRender.js");
            await startHomePage();

        } else {
            console.log("Backend non ha confermato l'autenticazione");
        }
    } else {

        console.log("Utente non autenticato");
        Clerk.redirectToSignIn();
    }
});
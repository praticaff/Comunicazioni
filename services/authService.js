//====================================================================================================
// index - Clerk.js - auth.js - authController.js - authService.js - authRepository.js
//====================================================================================================
//=====================================================================================================================================================
//SERVICE contiene la logia applicativa. Riceve i dati dal controller e li invia al repository. Non invia informazioni al db.
// NON restituisce json al controller ma invia con il return un oggetto con le informazioni.
//=====================================================================================================================================================

const authRepository = require ("../repositories/authRepository");

//====================================================================================================
// FUNZIONE VERIFICA UTENTE - Controlla se l'utente esiste già nel db, se è associato ad un ente attivo e restituisce le informazioni al controller
//====================================================================================================

async function verificaUtente(userData){
	console.log("Avvio la verifica utente con:",userData.clerkId);
	
	const utenteEsistente= await authRepository.cercaUtente(
		userData.clerkId
		);
	console.log ("terminata la funzione cercaUtente");
		
	if (utenteEsistente){
		console.log ("utente trovato nel DB");//se lo trova interrompe la funzione e restitusce il clerkId
		const usersId=utenteEsistente.id;

		const entiUtente= await authRepository.cercaEntiUtente(usersId);

		if (entiUtente.length === 0){
			console.log("L'utente non è associato ad alcun ente attivo");
			return {
				tipo: "nessunEnte",
				user: "utenteEsistente",
				enti: []
			};
		}

		if (entiUtente.length === 1){
			console.log("L'utente è associato ad un solo ente attivo");

			return {
				tipo: "unEnte",
				user: "utenteEsistente",
				enti: [entiUtente]
			};
		}

		if (entiUtente.length > 1){
			console.log("L'utente è associato a più enti attivi");

			return {
				tipo: "piùEnti",
				user: "utenteEsistente",
				enti: entiUtente
			};
		}
	}

	const nuovoUtente=await authRepository.creaUtente(userData);
	
	return {
		tipo: "nuovoUtente",
		user: "nuovoUtente",
		enti: []
	};
}

//====================================================================================================
// FUNZIONE SELEZIONA ENTE - Anche se lo sappiamo dalla prima fetch (/me), avvia la verificaAppartenenzaEnte e
// controlla se l'utente è associato all'ente selzionato dal frontend.
//====================================================================================================
	
async function selezionaEnte (usersId, clerkSessionId, enteId){

	const associazione= await authRepository.verificaAppartenenzaEnte(usersId, enteId);

	if(!associazione){
		console.log ("L'utente non risulta associato all'ente associato. Contattate L'amministratore del sistema");

		return{
			autorizzato: false,
		};
	} else{
		console.log("L'utente è associato all'ente selezionato, avvio la creazione della sessione");

		const sessione= await authRepository.creaSessione(usersId, clerkSessionId, enteId);

		return{
			autorizzato: true,
			sessione//è l'array di righe che contiene i valori dell'insert appena fatto
		};
	}
}

module.exports = {
	verificaUtente,
	selezionaEnte
};
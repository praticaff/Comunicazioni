//====================================================================================================
// index - Clerk.js - auth.js - authController.js - authService.js - authRepository.js
//====================================================================================================

//==============================================================================================================================
//CONTROLLER - Riceve e coordina la richiesta HTTP (gestisce req e res). 
// Riceve dalla rotta, la richiesta autenticata (tramite requireAuth()).
//==============================================================================================================================
console.log("avviato authController.js");

const { getAuth } = require("@clerk/express");//Prende la funzione getAuth di Clerk e la rende disponibile. getAuth recupera chi è l'utente autenticato
const authService = require("../services/authService"); //acquisisce userService che contiene la funzione verificaUtente per controllare se l'utente esiste già

const { clerkClient } = require("@clerk/express");//client server-side di clerk per recuperare tutti i dati dell'utente

//==============================================================================================================================
//FUNZIONE (/me) - Recupera i dati dell'utente tramite getAuth e chiama il service (verificaUtente) per applicare la logica
//==============================================================================================================================

async function me (req,res){
	console.log("avvio funzione me");
	try{
		const {userId, sessionId}=getAuth(req);//estrae l'userId, si usa {userId} per estrarre solo l'id, la sessionId non serve
		
		const clerkUser = await clerkClient.users.getUser(userId);//per estrarre tutti i dati dell'utente tramite l'id
				
		const userData = {//costruisco l'oggetto con tutti i dati dell'utente
			clerkId: clerkUser.id,
			email: clerkUser.emailAddresses[0].emailAddress,
			nome: clerkUser.firstName,
			cognome: clerkUser.lastName
		};
		
		console.log(userData);

		console.log ("prova prima verificaUtente");
		
		const verifica = await authService.verificaUtente(userData);

		console.log ("prova dopo verificaUtente");

		if (verifica.tipo === "nessunEnte"){
			return res.status(403).json({
				ok: true,
				errore: "L'utente non è associato ad alcun ente attivo",
				messaggio: "Contatta l'amministratore del sistema per essere associato ad un ente attivo"
			});
		}

		if (verifica.tipo === "unEnte"){
			return res.json({
				ok: true,
				user: verifica.user,
				richiedeSelezioneEnte: false,
				enti: verifica.enti
			});
		}

		if (verifica.tipo === "piùEnti"){
			return res.json({
				ok: true,
				user: verifica.user,
				richiedeSelezioneEnte: true,
				enti: verifica.enti
			});
		}

		if (verifica.tipo === "nuovoUtente"){
			return res.json({//invia la risposta al frontend con i dati della tabella user del DB, dopo aver fatto il match del clerkId (o creato il nuovo utente)
			ok:true,
			user: verifica.user,
			errore: "L'utente non è associato ad alcun ente attivo",
			messaggio: "Utente registrato. Contatta l'amministratore del sistema per essere associato ad un ente attivo"
		});
		}
	}
	catch(error){
		console.error(error);
		
		res.status(500).json({
			ok:false,
			error:error.message
		});
	}
}

//==============================================================================================================================
//FUNZIONE (/selezionaEnte) - Recupera i dati dell'utente tramite getAuth e chiama il service (verificaUtente) per applicare la logica
//==============================================================================================================================

async function selezionaEnte(req,res){
	console.log("Avvio selezionaEnte");
	try{
		const {userId, sessionId}=getAuth(req);//con le {} estraggo direttamente la proprietà userId e sessioId dall'autenticazione Clerk
		const {enteId}=req.body;//estraggo l'enteId dal body della richiesta (dal frontend)

		console.log("Utente Clerk:", userId);
        console.log("Sessione Clerk:", sessionId);
        console.log("Ente richiesto:", enteId);

		const risultato= await authService.selezionaEnte(userId, sessionId, enteId);

		if (!risultato.autorizzato){
			return res.status (403).json({
				ok: false,
				errore: "L'utente non è associato all'ente selezionato"
			});
		}else{
			return res.json({
				ok:true,
				sessione: risultato.sessione//riporto nel json i dati della sessione (query insert into)-- non serve al frontend
			});
			console.log ("dati della sessione:", res.json.sessione);
		}
	} catch (error){
		console.error(error); 
		res.status(500).json({
			ok:false,
			error:error.message
		});
	}
}

module.exports={
	me,
	selezionaEnte
}

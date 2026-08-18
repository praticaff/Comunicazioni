//==============================================================================================================================
//CONTROLLER che riceve e coordina la richiesta HTTP. Riceve dalla rotta la richiesta autenticata (tramite requireAuth()).
//			 Recupera i dati dell'utente tramite getAuth e chiama il service per applicare la logica
//==============================================================================================================================
console.log("avviato authController.js");

const { getAuth } = require("@clerk/express");//Prende la funzione getAuth di Clerk e la rende disponibile. getAuth recupera chi è l'utente autenticato
const authService = require("../services/authService"); //acquisisce userService che contiene la funzione verificaUtente per controllare se l'utente esiste già

const { clerkClient } = require("@clerk/express");//client server-side di clerk per recuperare tutti i dati dell'utente

async function me (req,res){
	console.log("avvio funzione me");
	try{
		const {userId}=getAuth(req);//estrae l'userId, si usa {userId} per estrarre solo l'id, la sessionId non serve
		
		const clerkUser = await clerkClient.users.getUser(userId);//per estrarre tutti i dati dell'utente tramite l'id
		
		console.log (userId);
		
		const userData = {//costruisco l'oggetto con tutti i dati dell'utente
			clerkId: clerkUser.id,
			email: clerkUser.emailAddresses[0].emailAddress,
			nome: clerkUser.firstName,
			cognome: clerkUser.lastName
		};
		
		console.log(userData);
		
		const user = await authService.verificaUtente(userData);
		
		res.json({//invia la risposta al frontend con i dati della tabella user del DB, dopo aver fatto il match del clerkId (o creato il nuovo utente)
			ok:true,
			user
		});
	}
	catch(error){
		console.error(error);
		
		res.status(500).json({
			ok:false,
			error:error.message
		});
	}
}

module.exports ={
	me
};
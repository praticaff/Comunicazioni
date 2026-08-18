//=====================================================================================================================================================
//SERVICE contiene la logia applicativa - Avvia il cercaUtente e se non viene trovato avvia il creaUtente
//=====================================================================================================================================================
const authRepository = require ("../repositories/authRepository");

async function verificaUtente(userData){
	console.log("Avvio la verifica utente");
	
	const utenteEsistente= await authRepository.cercaUtente(
		userData.clerkId
		);
		
	if (utenteEsistente){
		return utenteEsistente;
		console.log ("utente trovato nel DB");//se lo trova interrompe la funzione e restitusce il clerkId
	}
	
	const nuovoUtente=await authRepository.creaUtente(userData);
	
	return nuovoUtente;
	
}

module.exports = {
	verificaUtente
};
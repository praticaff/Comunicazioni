//====================================================================================================
// index - Clerk.js - auth.js - authController.js - authService.js - authRepository.js
//====================================================================================================
//=====================================================================================================================================================
//REPOSITORY - Il repository parla direttamente con PostgreSQL. Conosce il db ma non conosce il resto dell'applicazione. Contiene le funzioni che eseguono le query
//====================================================================================================================================================
const db = require("../db/connection");//importo connection.js perchè contiene il pool e quindi accedo al pool

console.log("=== AUTH REPOSITORY CARICATO ===");
console.log("FILE:", __filename);
//====================================================================================================
//FUNZIONE CHE CERCA L'UTENTE TRAMITE CLERK_ID
//====================================================================================================
async function cercaUtente(clerkId){//funzione asincrona che rivece l'id di Clerk

	console.log("Avvio la ricerca utente nel db con l'utente clerk:", clerkId);
	//db.query restituisce un oggetto
	const result = await db.query(
	`
	SELECT *
	FROM centrale.users
	WHERE clerk_id= $1`,[clerkId]);

	console.log("query terminata");	//$1 è un segnaposto e il valore vero viene preso da [clerkId]
	
	return result.rows [0];
	//rows è sempre un array e metto [0] cosa il primo e unico risultato è quello con l'id di Clerk (se c'è già nel db)
	
}

//====================================================================================================
//FUNZIONE CHE CERCA SE L'UTENTE E' REGISTRATO PER PIU' ENTI
//====================================================================================================
async function cercaEntiUtente(usersId){
	console.log("Avvio la ricerca degli enti dell'utente nel db");
	const result  = await db.query(
		`SELECT ue.id_ente, e.nome
		FROM centrale.users_ente AS ue
		INNER JOIN centrale.ente AS e
		ON ue.id_ente = e.id_ente
		WHERE ue.id_users= $1 AND ue.attivo = true`,[usersId]
	);
	//cerca nella tabellla users_enti con l'users_id e se è attivo
	console.log("qury user-ente terminata");

	return result.rows;
	
}

//====================================================================================================
//FUNZIONE CHE CREA UN NUOVO UTENTE
//====================================================================================================
async function creaUtente(userData){//la funzione riceve un oggetto che arriva dal service

	console.log("Avvio la creazione dell'utente");

	const {
        clerkId,
        email,
        nome,
        cognome
    } = userData; //oggetto che contiene i dati dell'utente

	const result =await db.query(
		`INSERT INTO centrale.users(
			clerk_id,
			email,
			nome,
			cognome)
		VALUES(
			$1, $2, $3, $4)
			RETURNING *`,//returning dice a postgreSQl di restituire la riga modificara dopo aver eseguito l'operazione di insert. Restituisce la riga appena creata in .json al frontend
		[
			clerkId,
			email,
			nome,
			cognome
		]
	);
	
	return result.rows [0];
	console.log("Nuovo uente registrato nel db");
}

//====================================================================================================
//FUNZIONE CHE ESTRAE LA RIGA DI USERS_ENTE (verifica l'esistenza dell'associazione tra utente e ente)
//====================================================================================================
async function verificaAppartenenzaEnte(usersId, enteId) {
	console.log("Avviata la verifica dell'appartenenza dell'utente all'ente");

	const result = await db.query(
		`SELECT *
		FROM centrale.users_ente
		WHERE id_users = $1 and id_ente=$2`,
		[usersId, enteId]
	);
	return result.rows[0];
}

//====================================================================================================
//FUNZIONE CHE CREA LA SESSIONE NEL DB
//====================================================================================================
async function creaSessione(usersId, clerkSessionId, enteId){
	console.log ("creazione della sessione");

	const result = await db.query(//returning restituisce la riga appena inserita cosi può essere presa dal return result.rows[0];
		`INSERT INTO centrale.session(
		clerk_session_id,
		id_users,
		id_ente)
		VALUES ($1,$2,$3)
		RETURNING *`,
		[	clerkSessionId,
			usersId,
			enteId
		]
	);

	return result.rows[0];
}

module.exports ={//esporta le funzioni per usarle nel service
	cercaUtente,
	creaUtente,
	cercaEntiUtente,
	verificaAppartenenzaEnte,
	creaSessione
};




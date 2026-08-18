//=====================================================================================================================================================
//REPOSITORY - Il repository parla direttamente con PostgreSQL. Conosce il db ma non conosce il resto dell'applicazione. Contiene le funzioni che eseguono le query
//====================================================================================================================================================

const db = require("../db/connection");//importo connection.js perchè contiene il pool e quindi accedo al pool


//===========================================
//FUNZIONE CHE CERCA L'UTENTE TRAMITE CLERK_ID
//===========================================
async function cercaUtente(clerkId){//funzione asincrona che rivece l'id di Clerk

	console.log("Avvio la ricerca utente nel db");

	const result = await db.query(//db.query restituisce un oggetto
	
	`
	SELECT *
	FROM centrale.users
	WHERE clerk_id= $1`,[clerkId]);//$1 è un segnaposto e il valore vero viene preso da [clerkId]
	
	return result.rows [0];//rows è sempre un array e metto [0] cosa il primo e unico risultato è quello con l'id di Clerk (se c'è già nel db)
							//se non esisitono utenti con quel clerk id rows[0] sarà undefined
}

//===========================================
//FUNZIONE CHE CREA UN NUOVO UTENTE
//===========================================

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

module.exports ={//esporta le funzioni per usarle nel service
	cercaUtente,
	creaUtente
};




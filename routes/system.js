const express = require("express");
const router = express.Router();
const db=require("../db/connection"); //apre il file connection.js per importare il pool (db è il pool) (strumento per creare la connessione PostgreSQL)

//==============================================================================================================================
//DB TEST - ROTTA PER TESTARE IL COLLEGAMENTO CON IL DB
///==============================================================================================================================

router.get("/db-test",async (req, res) => { 
	try{
		const result = await db.query ("SELECT NOW()");//esegue la query e tramite await aspetta il riultato prima di procedere
		
		res.json({
			ok:true,
			serverTime: result.rows[0]//della costante result estrapola un array di righe
		});
	} catch (error){
		console.error(error);
		
		res.status(500).json({
			ok:false,
			error: error.message
		});
	}
});

//==============================================================================================================================
//PING - il ping è un applicativo che usa il protocollo ICP
//==============================================================================================================================
router.get("/ping", (req, res) => {

    res.json({
        ok: true,
        server: "QuickHTTPServer"
    });

});

//==============================================================================================================================
//VERIFICA SE LA CONNESSIONE E' locale
//==============================================================================================================================

//app.use((req,res,next)=>{//middleware globale che viene eseguito ad ogni richiesta http...indirizzo ip+porta=socket
	//const ra=req.socket.remoteAddress//serve per identificare il remote address del socket della request
	//const isLocal=
		//ra==="127.0.0.1"||ra==="::1"||(typeof ra==="string" && ra.startsWith("::ffff:127.0.0.1"));//verifica se si sta lavorando in locale
		
	//if(!isLocal) return res.status(403).send("Solo richieste locali"); //se non è una richiesta locale comunica il messaggio (da utilizzare in fase di sviluppo)	
//});


module.exports = router;
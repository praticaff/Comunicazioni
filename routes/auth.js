//====================================================================================================
// index - Clerk.js - auth.js - authController.js - authService.js - authRepository.js
//====================================================================================================



const express = require("express");
const router = express.Router();

const {requireAuth}=require("@clerk/express");//importa la funzione requireAuth che controlla se l'utente è autenticato(il MIDDLEWARE) dalla libreria Clerk
											  //e a questo punto si può usare come una normale funzione

const authController=require("../controllers/authController.js"); //im

//==============================================================================================================================
//CONFIGURAZIONE DELLA ROTTA CLERK - fetch ("/me")
//==============================================================================================================================

router.get(//quando arriva una richiesta GET a /me, esegue la funzione requireAuth() e poi authController.me
  "/me",
  (req, res, next) => {//middleware aggiunto per verificare che la richiesta sia arrivata a /me (non indispensabile, ma utile per il debug)
    console.log("La richiesta è arrivata a /me");
    next();//qua bisogna usare next() per passare al middleware successivo
  },
  requireAuth(),//middleware di Clerk che controlla se l'utente è autenticato, se non lo è restituisce un errore 401
  authController.me
);

//==============================================================================================================================
//CONFIGURAZIONE DELLA ROTTA SELEZIONA ENTE - fetch ("/selezionaEnte")
//==============================================================================================================================

router.post("/selezionaEnte",
 requireAuth(),
 authController.selezionaEnte
);

module.exports=router;
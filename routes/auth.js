//==============================================================================================================================
//CONFIGURAZIONE DELLA ROTTA CLERK - fetch ("/me")
//==============================================================================================================================

const express = require("express");
const router = express.Router();

const {requireAuth}=require("@clerk/express");//importa la funzione requireAuth che controlla se l'utente è autenticato(il MIDDLEWARE) dalla libreria Clerk
											  //e a questo punto si può usare come una normale funzione

const authController=require("../controllers/authController.js"); //im

router.get(
  "/me",
  (req, res, next) => {
    console.log("La richiesta è arrivata a /me");
    next();
  },
  requireAuth(),
  authController.me
);


module.exports=router;
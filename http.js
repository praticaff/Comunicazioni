//==============================================================================================================================
//CREA IL SERVER, CARICA LA CONFIGURAZIONE E CONFIGURA I MIDDLEWARE
//==============================================================================================================================

require("dotenv").config();
//==============================================================================================================================
//importa la libreria che serve per dividere i dati sensibili dal codice. Importa il file .env presente nella root all'avvio del server (node) e crea un file process.env che contiene le
//varibiali che corrispondono alle righe del file .env
//==============================================================================================================================

const express = require ("express");//framework NodeJS che serve anche per la gestione delle allowed routes
const cors=require("cors");//importa le librerie che permettono di definire le rotte permesse dell'http (è un middleware)
const path=require("path");//importa la parte per gestire i path e pemette di definire la ___dirname (variabile di ambiente)

const {clerkMiddleware}= require ("@clerk/express");//middleware di Clerk per verificare, ad ogni richiesta, se la sessione clerk è attiva

const app=express();//è il Router che riceve le richieste e deve elaborare le risposte. Deve anche indicare la next route nel caso ci siano ulteriori richieste verso altro app server

const APP_HOST=process.env.APP_HOST//"0.0.0.0";//recupera da process.env (creato dalla lettura del file .env) l'indirizzo ip della mia macchina
const APP_PORT=Number(process.env.APP_PORT) || 8003;//dallo stsso file recupera il numero di porta e lo converte da string a numero


app.use (clerkMiddleware());

app.use(express.json());

/*==============================================================================================================================
//APP.USE PER VERIFICARE LO STATO DELLE RICHIESTE
//==============================================================================================================================
app.use((req, res, next) => {
console.log("========== RICHIESTA ==========");
  console.log("METHOD:", req.method);
  console.log("URL:", req.originalUrl);
  next();
});*/


//==============================================================================================================================
// CONFIGURAZIONE ROUTES
//==================================================================================================
const system = require("./routes/system");//rotta system
const auth = require("./routes/auth");//rotta clerk

//==============================================================================================================================
//CONFIGURAZIONE EXPRESS STATIC
//==============================================================================================================================
//express.static serve i file statici (html,css,js,immagini) e crea il percorso completo (___dirname è la cartella del file corrente). 
//E' la parte che prende la index e la manda al browser

app.use(express.static(path.join(__dirname,"public"),{
		etag:false,
		lastModified:false,
		setHeaders:(res,filePath)=>{
			res.setHeader("Cache-Control","no-store");//disabilita la cache.in sviluppo la cache viene disattivata altrimenti potrei non vedere le modifiche
		}
	})
);

//==============================================================================================================================
//CONFIGURAZIONE DEL CORS - CROSS ORIGIN RESOURCE SHARING
//==============================================================================================================================
app.use(cors({//usa la libreria CORS (si usa sempre app.use) e controlla se l'origine è tra quelle consentite
	origin:(origin,cb)=>{//il valore origin è uno di quelli consentiti (input) e in cors si intende protocollo + hostname + porta ,cb è il risultato del processamento (callback)
		const allowed =new Set ([
		//"https://167.235.147.132",
		"http://167.235.147.132", //non bisogna scrivere la porta perchè quella viene gestita da Nginx
		]);
		if (origin && allowed.has(origin)) return cb (null,true);//se questo set "allowed" ha l'elemento origin e quindi quello che sto passando è uguale a quello che sto cercando
		return cb(null,false)
	},
	credentials:false,
}));

app.use(system);

app.use(auth);

//==============================================================================================================================
//AVVIA IL SERVER E LO METTE IN ASCOLTO SULLA PORTA - Mette express (app) in ascolto e crea un oggetto che lo rappresenta
//==============================================================================================================================
const server=app.listen(APP_PORT,APP_HOST,()=>{//${} serve per concatenare
	console.log(`QuickHTTPServer:http://${APP_HOST}:${APP_PORT}`); //messaggio di conferma nel terminale, non apre nulla. Essendo un callback serve a capire che il server è partito
});

module.exports={app,server};//rendo disponbile app e server anche in altri file


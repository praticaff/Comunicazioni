//const QUICKHTTP_BASE1=process.env.URL;
//const QUICKHTTP_BASE1="http://localhost:3000";
//import testoOspitalita from "./testoPratica/testoOspitalita.js";
//import cercaOspitalita from "./testoPratica/cercaOspitalita.js";
export const pratiche=[
{
	id:"1",
	label:"CESSIONI DI FABBRICATO",
	icona:"../immagini/ospitalita.png",
	testoRicerca: ()=>import (`./testoPratica/cercaOspitalita.js`),
	testo: ()=>import (`./testoPratica/testoOspitalita.js`),
},
{
	id:"2",
	label: "CONTRASSEGNI DISABILI",
	icona:"../immagini/contrassegni disabili.png",
	testoRicerca:()=>import (`./testoPratica/cercaContrassegni.js`),
	testo:()=>import (`./testoPratica/testoContrassegni.js`),

},
{
	id:"3",
	label:"CENTRALE OPERATIVA",
	sottovoce:[
					{
						id:"1",
						label:"VEICOLI",
						icona:"../immagini/veicoli.png",
						testoRicerca:()=>import (`./testoPratica/cercaVeicoli.js`),
						testo:()=>import (`./testoPratica/testoVeicoli.js`),
					},	
					{
						id:"2",
						label:"PATENTI",
						icona:"../immagini/patenti.png",
						testoRicerca:()=>import (`./testoPratica/cercaPatenti.js`),
						testo:()=>import (`./testoPratica/testoPatenti.js`),
					},
				]},
];


//====================================================================================================
// FUNZIONE PER CREARE NELLA INDEX LA LISTA DEGLI ENTI ASSOCIATI ALL'UTENTE
// Viene avviata da clerk.js se dalla verificaUtente risultano più enti associati
//====================================================================================================

export async function avviaSelezioneEnte(resEnti) {
    console.log(resEnti)
    const resLogin= document.getElementById("resLogin");

    const contenitoreEnti=document.createElement("div");//creo il div he conterrà i vari enti
    contenitoreEnti.id="contenitoreEnti";
    contenitoreEnti.classList.add("contenitoreEnti");


    resEnti.forEach(ente =>{
        const idEnte=ente.id_ente;

        const divEnte=document.createElement("div");
        divEnte.classList.add("divEnte");
        divEnte.id="divEnte";
        divEnte.textContent=ente.nome;

        divEnte.addEventListener("click", async () =>{

            const response = await fetch("/selezionaEnte",{                                                                                                                                          
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({enteId:idEnte})
            });
        });
        contenitoreEnti.appendChild(divEnte);
    });
resLogin.appendChild(contenitoreEnti);
}

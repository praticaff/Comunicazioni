//====================================================================================================
//CONNECTION POOL - Creazion del gestore di connessioni al DB
//====================================================================================================

const { Pool } = require("pg"); //strumento per creare la connessione PostgreSQL
require("dotenv").config({ path: "../.env" });


const pool = new Pool({ //gestore che permette a Express di riutilizzare le connessioni al db
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

pool.on("error", (err) => {
    console.error("Errore inatteso nel pool PostgreSQL:", err);
});

module.exports = pool; //esporta il pool per l'import nel file http.js



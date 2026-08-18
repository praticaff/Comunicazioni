const pool = require("./connection");

async function showTables() {
    try {
        const result = await pool.query(`
            SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_type = 'BASE TABLE'
ORDER BY table_schema, table_name;
        `);

        console.log(result.rows);

    } catch (error) {
        console.error(error.message);
    } finally {
        await pool.end();
    }
}

showTables();
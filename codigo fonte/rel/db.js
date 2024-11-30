import mysql from "mysql2";

export const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "admin4",
    database: process.env.DB_NAME || "loja_db"
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conexão ao MySQL bem-sucedida!');
});
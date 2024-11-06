import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "admin4",
    database: "loja_db"
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return; // Evita que novas consultas sejam tentadas
    }
    console.log('Conexão ao MySQL bem-sucedida!');
});

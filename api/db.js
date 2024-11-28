import mysql from "mysql2";
import { initializeDatabase } from './utils/migration_handler.js';

/**
 * Cria uma conexão com o banco de dados MySQL usando os dados de configuração
 * process.env permite acessar variáveis de ambiente do sistema
 * O operador || fornece um valor padrão caso a variável de ambiente não exista
 */
export const db = mysql.createConnection({
    // Host é o endereço do servidor do banco de dados
    host: process.env.DB_HOST || "localhost",

    // Porta padrão do MySQL é 3306
    port: 3306,

    // Usuário para autenticação no MySQL
    user: process.env.DB_USER || "root",

    // Senha do usuário MySQL
    password: process.env.DB_PASSWORD || "admin4",

    // Nome do banco de dados que vamos usar
    database: process.env.DB_NAME || "loja_db"
});

/**
 * Tenta estabelecer a conexão com o banco de dados
 * Esta função é assíncrona pois a conexão pode demorar
 * 
 * @param {Error} err - Objeto de erro caso a conexão falhe
 */
db.connect(async (err) => {
    // Se houver erro na conexão, mostra o erro e encerra
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }

    // Se chegou aqui, a conexão foi bem sucedida
    console.log('Conexão ao MySQL bem-sucedida!');

    // Após conectar, inicializa o banco de dados se necessário
    // Isso inclui criar tabelas e inserir dados iniciais
    await initializeDatabase();
});

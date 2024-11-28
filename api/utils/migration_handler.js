import { db } from '../db.js';
import migrations from '../migrations/init.js';
import seeds from '../seeds/initial_data.js';

/**
 * Este arquivo é responsável por gerenciar as migrações do banco de dados.
 * Migrações são scripts que modificam a estrutura do banco de dados (como criar tabelas)
 * de forma controlada e versionada.
 */

/**
 * Verifica se as migrações já foram executadas anteriormente
 * consultando se existe uma tabela de log de migrações no banco.
 * 
 * @returns {Promise<boolean>} Retorna true se as migrações já foram executadas
 */
const checkMigrations = async () => {
    try {
        // Consulta o catálogo do MySQL (information_schema) para verificar se nossa tabela existe
        // information_schema é uma base de dados que contém metadados sobre o banco
        const [rows] = await db.promise().query(`
            SELECT COUNT(*) as count 
            FROM information_schema.tables 
            WHERE table_schema = DATABASE() 
            AND table_name = 'migrations_log'
        `);

        return rows[0].count > 0;
    } catch (error) {
        console.error('Erro ao verificar migrations:', error);
        return false;
    }
};

/**
 * Executa as migrações do banco de dados.
 * Esta função separa as queries de criação de tabelas das queries de criação de triggers,
 * pois triggers precisam ser executados separadamente.
 * 
 * @returns {Promise<boolean>} Retorna true se as migrações foram executadas com sucesso
 */
const runMigrations = async () => {
    try {
        console.log('Iniciando execução das migrations...');
        
        // Divide o arquivo de migrações em duas partes: criação de tabelas e criação de triggers
        // Isso é necessário porque triggers precisam ser executados individualmente
        const migrationParts = migrations.split('CREATE TRIGGER');
        
        // Executa as queries de criação de tabelas
        // O regex /;\s*(?=(?:[^']*'[^']*')*[^']*$)/g divide por ponto e vírgula,
        // mas ignora ponto e vírgula dentro de strings (entre aspas)
        const tableQueries = migrationParts[0].split(/;\s*(?=(?:[^']*'[^']*')*[^']*$)/g);
        for (const query of tableQueries) {
            if (query.trim()) {
                await db.promise().query(query);
            }
        }
        
        // Executa cada trigger separadamente
        // Triggers são mecanismos que executam automaticamente quando certas ações ocorrem no banco
        for (let i = 1; i < migrationParts.length; i++) {
            const triggerQuery = 'CREATE TRIGGER' + migrationParts[i];
            if (triggerQuery.trim()) {
                await db.promise().query(triggerQuery);
            }
        }

        // Registra que a migração foi executada com sucesso
        await db.promise().query(`
            INSERT INTO migrations_log (migration_name) 
            VALUES ('initial_migration')
        `);

        console.log('Migrations executadas com sucesso!');
        return true;
    } catch (error) {
        console.error('Erro ao executar migrations:', error);
        return false;
    }
};

/**
 * Executa os seeds (dados iniciais) no banco de dados.
 * Seeds são dados iniciais que precisam existir para a aplicação funcionar,
 * como usuários padrão, configurações iniciais, etc.
 * 
 * @returns {Promise<boolean>} Retorna true se os seeds foram executados com sucesso
 */
const runSeeds = async () => {
    try {
        console.log('Iniciando inserção dos dados iniciais...');
        
        // Divide o arquivo de seeds em queries individuais
        const queries = seeds.split(';');
        
        // Executa cada query de seed separadamente
        for (const query of queries) {
            if (query.trim()) {
                await db.promise().query(query);
            }
        }

        console.log('Dados iniciais inseridos com sucesso!');
        return true;
    } catch (error) {
        console.error('Erro ao inserir dados iniciais:', error);
        return false;
    }
};

/**
 * Verifica se já existem dados nas tabelas principais
 * @returns {Promise<boolean>} Retorna true se já existem dados
 */
const checkExistingData = async () => {
    try {
        const [rows] = await db.promise().query(`
            SELECT 
                (SELECT COUNT(*) FROM cliente) as clienteCount,
                (SELECT COUNT(*) FROM vendedor) as vendedorCount,
                (SELECT COUNT(*) FROM produto) as produtoCount
        `);
        
        return rows[0].clienteCount > 0 && 
               rows[0].vendedorCount > 0 && 
               rows[0].produtoCount > 0;
    } catch (error) {
        console.error('Erro ao verificar dados existentes:', error);
        return false;
    }
};

/**
 * Função principal que coordena todo o processo de inicialização do banco de dados.
 * Primeiro verifica se as migrações já foram executadas, se não, executa as migrações
 * e em seguida faz o mesmo para os seeds.
 */
export const initializeDatabase = async () => {
    const migrationsExecuted = await checkMigrations();
    
    if (!migrationsExecuted) {
        const migrationSuccess = await runMigrations();
        if (!migrationSuccess) {
            console.error('Falha ao executar as migrations.');
            return;
        }
    }

    // Verifica se existem dados, independente do status das migrations
    const hasExistingData = await checkExistingData();
    if (!hasExistingData) {
        console.log('Dados iniciais não encontrados. Executando seeds...');
        await runSeeds();
    } else {
        console.log('Dados iniciais já existem no banco.');
    }
}; 
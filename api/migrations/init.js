// Queries de criação das tabelas
const migrations = `
CREATE TABLE IF NOT EXISTS migrations_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    migration_name VARCHAR(255),
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cliente(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE,
    email VARCHAR(255),
    numero_tel BIGINT
);

CREATE TABLE IF NOT EXISTS vendedor(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE,
    email VARCHAR(255),
    numero_tel BIGINT,
    cod_matricula VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS produto(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    quantidade BIGINT NOT NULL,
    preco BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS compra (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    vendedor_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (vendedor_id) REFERENCES vendedor(id),
    FOREIGN KEY (produto_id) REFERENCES produto(id)
);

CREATE TRIGGER IF NOT EXISTS after_insert_compra
AFTER INSERT ON compra
FOR EACH ROW
BEGIN
    UPDATE produto
    SET quantidade = quantidade - NEW.quantidade
    WHERE id = NEW.produto_id;
END;

CREATE TRIGGER IF NOT EXISTS after_delete_compra
AFTER DELETE ON compra
FOR EACH ROW
BEGIN
    UPDATE produto
    SET quantidade = quantidade + OLD.quantidade
    WHERE id = OLD.produto_id;
END;
`;

export default migrations; 
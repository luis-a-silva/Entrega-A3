const seeds = `
INSERT INTO cliente (nome, data_nascimento, email, numero_tel)
VALUES 
    ('Maria Silva', '1990-05-15', 'maria.silva@example.com', 11987654321),
    ('João Santos', '1985-03-20', 'joao.santos@example.com', 11999887766),
    ('Carlos Oliveira', '1992-08-25', 'carlos.oliveira@example.com', 11955554444),
    ('Patricia Lima', '1988-11-30', 'patricia.lima@example.com', 11944443333),
    ('Roberto Alves', '1995-04-12', 'roberto.alves@example.com', 11933332222);

INSERT INTO vendedor (nome, data_nascimento, email, cod_matricula, numero_tel)
VALUES 
    ('José Luiz', '1990-05-15', 'jose.luiz@example.com', '001', 11988887070),
    ('Ana Paula', '1988-07-10', 'ana.paula@example.com', '002', 11977776666);

INSERT INTO produto (nome, descricao, quantidade, preco)
VALUES 
    ('Gnomo Clássico', 'Gnomo tradicional para jardim', 50, 89),
    ('Gnomo Pescador', 'Gnomo com vara de pescar', 30, 129),
    ('Gnomo Dorminhoco', 'Gnomo deitado para decoração', 40, 99),
    ('Gnomo Jardineiro', 'Gnomo com ferramentas de jardim', 25, 119),
    ('Gnomo Músico', 'Gnomo tocando acordeão', 20, 139),
    ('Gnomo Casal', 'Par de gnomos românticos', 15, 179),
    ('Gnomo Luminoso', 'Gnomo com lanterna solar', 35, 159),
    ('Gnomo Sentado', 'Gnomo sentado em cogumelo', 45, 109),
    ('Gnomo Mágico', 'Gnomo com varinha mágica', 30, 149),
    ('Gnomo Guarda', 'Gnomo com escudo e espada', 25, 169);
`;

export default seeds; 
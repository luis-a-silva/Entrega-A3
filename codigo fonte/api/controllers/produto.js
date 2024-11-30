import {db} from "../db.js";

export const getProduto = (_, res) => {
    const query = "SELECT * FROM produto";

    db.query(query, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const getProdutoById = (req, res) => {
    const query = "SELECT * FROM produto WHERE `id` = ?";

    db.query(query, [req.params.id], (err,data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    })
};


export const addProduto = (req, res) => {
    const query = "INSERT INTO produto(`nome`, `descricao`, `quantidade`, `preco`) VALUES(?)";
    
    const values = [
        req.body.nome,
        req.body.descricao,
        req.body.quantidade,
        req.body.preco
    ];

    db.query(query, [values], (err) => {
        if(err) return res.json(err);

        return res.status(200).json('Novo cliente cadastrado com sucesso!');
    })
}

export const updateProduto = (req, res) => {
    const query = "UPDATE produto SET `nome` = ?, `descricao` = ?, `quantidade` = ?, `preco` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.descricao,
        req.body.quantidade,
        req.body.preco
    ];

    db.query(query, [...values, req.params.id], (err) => {
        return res.status(200).json("Dados atualizados com sucesso!");
    });
}

export const deleteProduto = (req, res) => {
    const query = "DELETE FROM produto WHERE `id` = ?";

    db.query(query, [req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Cliente deletado com sucesso!");
    })
}
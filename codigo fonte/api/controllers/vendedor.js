import {db} from "../db.js";

export const getVendedor = (_, res) => {
    const query = "SELECT * FROM vendedor";

    db.query(query, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const getVendedorById = (req, res) => {
    const query = "SELECT * FROM vendedor WHERE `id` = ?";

    db.query(query, [req.params.id], (err,data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    })
};


export const addVendedor = (req, res) => {
    const query = "INSERT INTO vendedor(`nome`, `data_nascimento`, `email`, `numero_tel`, `cod_matricula`) VALUES(?)";
    
    const values = [
        req.body.nome,
        req.body.data_nascimento,
        req.body.email,
        req.body.numero_tel,
        req.body.cod_matricula
    ];

    db.query(query, [values], (err) => {
        if(err) return res.json(err);

        return res.status(200).json('Novo cliente cadastrado com sucesso!');
    })
}

export const updateVendedor = (req, res) => {
    const query = "UPDATE vendedor SET `nome` = ?, `data_nascimento` = ?, `email` = ?, `numero_tel` = ?, `cod_matricula` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.data_nascimento,
        req.body.email,
        req.body.numero_tel,
        req.body.cod_matricula
    ];

    db.query(query, [...values, req.params.id], (err) => {
        return res.status(200).json("Dados atualizados com sucesso!");
    });
}

export const deleteVendedor = (req, res) => {
    const query = "DELETE FROM vendedor WHERE `id` = ?";

    db.query(query, [req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Cliente deletado com sucesso!");
    })
}
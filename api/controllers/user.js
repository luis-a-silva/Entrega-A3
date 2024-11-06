import {db} from "../db.js";

export const getUsers = (_, res) => {
    const query = "SELECT * FROM cliente";

    db.query(query, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const getUserById = (req, res) => {
    const query = "SELECT * FROM cliente WHERE `id` = ?";

    db.query(query, [req.params.id], (err,data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    })
};


export const addUser = (req, res) => {
    const query = "INSERT INTO cliente(`nome`, `data_nascimento`, `email`, `numero_tel`) VALUES(?)";
    
    const values = [
        req.body.nome,
        req.body.data_nascimento,
        req.body.email,
        req.body.numero_tel
    ];

    db.query(query, [values], (err) => {
        if(err) return res.json(err);

        return res.status(200).json('Novo cliente cadastrado com sucesso!');
    })
}

export const updateUser = (req, res) => {
    const query = "UPDATE cliente SET `nome` = ?, `data_nascimento` = ?, `email` = ?, `numero_tel` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.data_nascimento,
        req.body.email,
        req.body.numero_tel
    ];

    db.query(query, [...values, req.params.id], (err) => {
        return res.status(200).json("Dados atualizados com sucesso!");
    });
}

export const deleteUser = (req, res) => {
    const query = "DELETE FROM cliente WHERE `id` = ?";

    db.query(query, [req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Cliente deletado com sucesso!");
    })
}
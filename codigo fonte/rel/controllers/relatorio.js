import {db} from "../db.js";

export const getProdutoMaisVendido = (_, res) => {
    const query = "select sum(c.quantidade) as total_unidades_vendidas, c.produto_id as produto_id, pr.nome as produto_nome, pr.descricao as produto_descricao from compra c"
                    +" inner join produto pr on produto_id = pr.id"
                    +" group by produto_id"
                    +" order by total_unidades_vendidas desc";
    db.query(query, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const getTotalCompraByCliente = (_, res) => {
    const query = "select sum(c.quantidade) as total_unidades_compradas, cli.id as cliente_id, cli.nome as cliente_nome from compra c"
                        +" inner join cliente cli on cliente_id = cli.id"
                        +" group by cliente_id";
    db.query(query, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const getConsumoMedioByCliente = (_, res) => {
    const query = "select avg(c.total) as media_consumo_cliente, cli.id as cliente_id, cli.nome as cliente_nome from compra c"
                    + " inner join cliente cli on cliente_id = cli.id"
                    + " group by cliente_id";
    db.query(query, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};


export const getProdutoByQuantidade = (req, res) => {
    const query = "SELECT * FROM produto" 
                    + " WHERE `quantidade` <= ?";

    db.query(query, [req.params.quantidade], (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};


import {db} from "../db.js";

export const getCompra = (_, res) => {
    const query = "select c.id, cli.nome as cliente, v.nome as vendedor, pr.nome as produto, c.quantidade, c.total from compra c" 
                    +" inner join cliente cli on c.cliente_id = cli.id" 
                    +" inner join vendedor v on c.vendedor_id = v.id" 
                    +" inner join produto pr on c.produto_id = pr.id";

    db.query(query, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const getCompraById = (req, res) => {
    const query = "select c.id, cli.nome as cliente, v.nome as vendedor, pr.nome as produto, c.quantidade, c.total from compra c" 
                    +" inner join cliente cli on c.cliente_id = cli.id" 
                    +" inner join vendedor v on c.vendedor_id = v.id" 
                    +" inner join produto pr on c.produto_id = pr.id"
                    +" where `id` = ?";

    db.query(query, [req.params.id], (err,data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    })
};

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

export const addCompra = (req, res) => {
    const query = "INSERT INTO compra(`cliente_id`, `vendedor_id`, `produto_id`, `quantidade`, `total`) VALUES(?)";
    
    const values = [
        req.body.cliente_id,
        req.body.vendedor_id,
        req.body.produto_id,
        req.body.quantidade,
        req.body.total
    ];

    db.query(query, [values], (err) => {
        if(err) return res.json(err);

        return res.status(200).json('Nova compra cadastrado com sucesso!');
    })
}


export const deleteCompra = (req, res) => {
    const query = "DELETE FROM compra WHERE `id` = ?";

    db.query(query, [req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("compra deletado com sucesso!");
    })
}
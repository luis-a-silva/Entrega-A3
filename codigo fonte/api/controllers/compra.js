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
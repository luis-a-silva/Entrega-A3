const api ="http:\\localhost:8800";
const tabelaDados = document.getElementById('relatorio-table');

document.getElementById('relatorio-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário
    const relatorioOption = document.getElementById('relatorio').value;
    fetchData(relatorioOption);
    document.getElementById('btnGerar').disabled = true;

});


async function fetchData(option){
    try {
        // Faça a requisição para a API
        const consumoMediaByClienteResponse = await fetch(api + '/getConsumoMedioByCliente');
        const produtoMaisVendidoResponse = await fetch(api + '/getProdutoMaisVendido');
        const totalCompraByClienteResponse = await fetch(api + '/getTotalCompraByCliente');
        const quantidadeRestanteResponse = await fetch(api + '/getProdutoByQuantidade/' + 10);
   
        // Verifique se a resposta está ok (status 200)
        if (!consumoMediaByClienteResponse.ok) throw new Error(`Erro: ${consumoMediaByClienteResponse.statusText}`);
        if (!produtoMaisVendidoResponse.ok) throw new Error(`Erro: ${produtoMaisVendidoResponse.statusText}`);
        if (!totalCompraByClienteResponse.ok) throw new Error(`Erro: ${totalCompraByClienteResponse.statusText}`);
        if (!quantidadeRestanteResponse.ok) throw new Error(`Erro: ${quantidadeRestanteResponse.statusText}`);

        const tableBody = document.getElementById('relatorio-table').getElementsByTagName('tbody')[0];
        // Converta a resposta para JSON
        const consumoByClienteData = await consumoMediaByClienteResponse.json();
        const produtoMaisVendidoData = await produtoMaisVendidoResponse.json();
        const totalCompraByClienteData = await totalCompraByClienteResponse.json();
        const quantidadeRestanteData = await quantidadeRestanteResponse.json();

        const headerRow = document.getElementById('cabecalho-table');

        if(option == 0){
            alert('Escolha um relatório !');
            document.getElementById('btnGerar').disabled = false;
        } else if(option == 1){
            document.getElementById('btnRecarregar').style.display = "block";
            tabelaDados.style.display = "block";

            const headerTotal = document.createElement('th');
            headerTotal.textContent = `Total de unidades vendidas`;
            headerRow.appendChild(headerTotal);

            
            const headerProduto = document.createElement('th');
            headerProduto.textContent = `Produto`;
            headerRow.appendChild(headerProduto);

            const headerDescricao = document.createElement('th');
            headerDescricao.textContent = `Descrição`;
            headerRow.appendChild(headerDescricao);

            produtoMaisVendidoData.forEach(item => {
                const row = document.createElement('tr');
           

                // Preencha as células com os dados do JSON
                const cellTotalVendidos = document.createElement('td');
                cellTotalVendidos.textContent = item.total_unidades_vendidas;
                row.appendChild(cellTotalVendidos);
    
                const cellProdutoNome = document.createElement('td');
                cellProdutoNome.textContent = item.produto_nome;
                row.appendChild(cellProdutoNome);
    
                const cellProdutoDescricao = document.createElement('td');
                cellProdutoDescricao.textContent = item.produto_descricao;
                row.appendChild(cellProdutoDescricao);
                // Adicione a linha à tabela

                tableBody.appendChild(row);
            });
        }else if(option == 2){
            document.getElementById('btnRecarregar').style.display = "block";
            tabelaDados.style.display = "block";
            

            const headerNome = document.createElement('th');
            headerNome.textContent = `Nome`;
            headerRow.appendChild(headerNome);

            const headerTotal = document.createElement('th');
            headerTotal.textContent = `Total de unidades compradas`;
            headerRow.appendChild(headerTotal);



            totalCompraByClienteData.forEach(item => {
                const row = document.createElement('tr');
            
                // Preencha as células com os dados do JSON
                const cellClienteNome = document.createElement('td');
                cellClienteNome.textContent = item.cliente_nome;
                row.appendChild(cellClienteNome);
    
                const cellTotalComprados = document.createElement('td');
                cellTotalComprados.textContent = item.total_unidades_compradas;
                row.appendChild(cellTotalComprados);
              
                tableBody.appendChild(row);
            });
            
        }else if(option == 3){
            document.getElementById('btnRecarregar').style.display = "block";
            tabelaDados.style.display = "block";
            
            const headerNome = document.createElement('th');
            headerNome.textContent = `Cliente`;
            headerRow.appendChild(headerNome);

            const headerConsumoMedio = document.createElement('th');
            headerConsumoMedio.textContent = `Consumo médio`;
            headerRow.appendChild(headerConsumoMedio);
              

            consumoByClienteData.forEach(item => {
                const row = document.createElement('tr');
                
                
                const cellClienteNome = document.createElement('td');
                cellClienteNome.textContent = item.cliente_nome;
                row.appendChild(cellClienteNome);

                // Preencha as células com os dados do JSON
                const cellTotalComprados = document.createElement('td');
                const totalFormatado = parseFloat(item.media_consumo_cliente).toFixed(2);
                cellTotalComprados.innerText = `R$ ${totalFormatado}`;
                row.appendChild(cellTotalComprados);
    
    
                tableBody.appendChild(row);
            });
        }else if (option == 4){
                document.getElementById('btnRecarregar').style.display = "block";
                tabelaDados.style.display = "block";
                
                const headerProduto = document.createElement('th');
                headerProduto.textContent = `Produto`;
                headerRow.appendChild(headerProduto);
    
                const headerDescricao = document.createElement('th');
                headerDescricao.textContent = `Descrição`;
                headerRow.appendChild(headerDescricao);
    
                const headerTotal = document.createElement('th');
                headerTotal.textContent = `Quantidade`;
                headerRow.appendChild(headerTotal);
    
                quantidadeRestanteData.forEach(item => {
                    const row = document.createElement('tr');

                    // Preencha as células com os dados do JSON

                    const cellProdutoNome = document.createElement('td');
                    cellProdutoNome.textContent = item.nome;
                    row.appendChild(cellProdutoNome);
        
                    const cellProdutoDescricao = document.createElement('td');
                    cellProdutoDescricao.textContent = item.descricao;
                    row.appendChild(cellProdutoDescricao);
    
                    const cellQuantidade= document.createElement('td');
                    cellQuantidade.textContent = item.quantidade;
                    row.appendChild(cellQuantidade);
                    // Adicione a linha à tabela
    
                    tableBody.appendChild(row);
                });
        }
    }catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

function alertMessage(message){
    alert(message);
    setTimeout(
        location.reload(),1000
    )
}



// Função para mostrar o modal com o formulário

// Função para fechar o modal


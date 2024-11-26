const api ="http:\\localhost:8800";

async function fetchData() {
    try {
        // Faça a requisição para a API
        const response = await fetch(api + '/getCompra');
        
        // Verifique se a resposta está ok (status 200)
        if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
        
        // Converta a resposta para JSON
        const data = await response.json();

        // Obtenha o elemento tbody da tabela
        const tableBody = document.getElementById('table-compra').getElementsByTagName('tbody')[0];

        // Para cada item no JSON, crie uma nova linha e insira as células
        data.forEach(item => {
            const row = document.createElement('tr');

            // Preencha as células com os dados do JSON
            const cellCliente = document.createElement('td');
            cellCliente.textContent = item.cliente;
            row.appendChild(cellCliente);

            const cellVendedor = document.createElement('td');
            cellVendedor.textContent = item.vendedor;
            row.appendChild(cellVendedor);

            const cellProduto = document.createElement('td');
            cellProduto.textContent = item.produto;
            row.appendChild(cellProduto);

            const cellQuantidade = document.createElement('td');
            cellQuantidade.textContent = item.quantidade;
            row.appendChild(cellQuantidade);

            
            const cellTotal = document.createElement('td');
            cellTotal.textContent = item.total;
            row.appendChild(cellTotal);

            const acoesBtn = document.createElement('td');
            acoesBtn.innerHTML = `<button onclick="btnDeleteHandler(${item.id})" class="icon" title="Cancelar"><i class="material-icons">close</i></button>`;
            row.appendChild(acoesBtn);

            // Adicione a linha à tabela
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

function alertMessage(message){
    alert(message);
    setTimeout(
        location.reload(),1000
    )
}

function btnDeleteHandler(item){
    const id =  item;
    var confirmDelete = confirm('Deseja cancelar compra? ');
    if(confirmDelete) {
        deleteData(api + "/deleteCompra", id);
    } else {
      //Apenas abortar o processo;
    }
}

// Função para mostrar o modal com o formulário


// Função para fechar o modal
function closeForm() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Função para excluir dados (DELETE), requer o ID como parâmetro
async function deleteData(url, id) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
        alertMessage("Dados excluídos com sucesso")
        return true;
    } catch (error) {
    
        alertMessage('Erro ao excluir dados:')
        return false;
    }
}


fetchData();
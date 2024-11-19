const api ="http:\\localhost:8800";

async function fetchData() {
    try {
        const response = await fetch(api + '/getProduto');
        if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
        const data = await response.json();
        const tableBody = document.getElementById('table-produto').getElementsByTagName('tbody')[0];

        data.forEach(item => {
            const row = document.createElement('tr');

            // Preencha as células com os dados do JSON
            const cellNome = document.createElement('td');
            cellNome.textContent = item.nome;
            row.appendChild(cellNome);

            const cellDescricao= document.createElement('td');
            cellDescricao.textContent = item.descricao;
            row.appendChild(cellDescricao);

            const cellQuantidade = document.createElement('td');
            cellQuantidade.textContent = item.quantidade;
            row.appendChild(cellQuantidade);

            const cellPreco = document.createElement('td');
            cellPreco.textContent = item.preco;
            row.appendChild(cellPreco);

            const acoesBtn = document.createElement('td');
            acoesBtn.innerHTML = `<button onclick="btnDeleteHandler(${item.id})">Apagar</button>   |    <button id=editar onclick="btnEditarHandler(${item.id})">Editar</button>    |   <button onclick="btnAdicionarSacola(${item.id})">Adicionar a sacola</button>`
            row.appendChild(acoesBtn);

            // Adicione a linha à tabela
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}
/*
function formatarData(data) {
    const date = new Date(data);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function formatarData2(data) {
    const date = new Date(data);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();
    return `${ano}-${mes}-${dia}`;
}

function formatarTelefone(telefone) {
    const telefoneStr = String(telefone); // Converter para string
    if (telefoneStr.length === 11) {
        const ddd = telefoneStr.slice(0, 2);
        const primeiroDigito = telefoneStr.slice(2, 3);
        const parte1 = telefoneStr.slice(3, 7);
        const parte2 = telefoneStr.slice(7);
        return `(${ddd}) ${primeiroDigito} ${parte1}-${parte2}`;
    } else {
        return 'Telefone inválido';
    }
}
*/

async function btnAdicionarSacola(id){
    try {
        // Faça a requisição para a API
        const response = await fetch(`${api}/getProdutoById/${id}`);
        
        // Verifique se a resposta está ok (status 200)
        if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
        
        // Converta a resposta para JSON
        const data = await response.json();

        data.forEach(item => {
          
            // Preencha o formulário com osn dados retornados (exemplo)
            document.getElementById("editarNome").value = item.nome; // Preencher nome
            document.getElementById("editarDescricao").value = item.descricao; // Preencher data de nascimento
            document.getElementById("editarQuantidade").value = item.quantidade; // Preencher email
            document.getElementById("editarPreco").value = item.preco; //Prencher numero de telefone
        })

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao buscar produto');
    }
}

function alertMessage(message){
    alert(message);
    setTimeout(
        location.reload(),1000
    )
}

async function postData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
        
        const result = await response.json();
        alertMessage('Dados enviados com sucesso:');
        return result;
    }catch (error) {
        alertMessage('Erro ao enviar dados:');
    }
}

// Manipulador de envio do formulário
document.getElementById('produtoForm').addEventListener('submit', function(event) {
event.preventDefault(); // Impede o comportamento padrão do formulário

// Obtemos os valores dos campos do formulário
const clienteData = {
    nome: document.getElementById('nome').value,
    descricao: document.getElementById('descricao').value,
    quantidade: document.getElementById('quantidade').value,
    preco: document.getElementById('preco').value
};

// Chama a função postData para enviar os dados
postData(api + '/addProduto', clienteData); // Altere a URL conforme a necessidade
});


function btnDeleteHandler(item){
    const id =  item;
    var confirmDelete = confirm('Deseja deletar produto? ');
    if(confirmDelete) {
        deleteData(api + "/deleteProduto", id);
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

async function btnEditarHandler(id) {
    const modal = document.getElementById("modal");
    modal.style.display = "block";

    console.log("ID para edição:", id);
    
    try {
        // Faça a requisição para a API
        const response = await fetch(`${api}/getProdutoById/${id}`);
        
        // Verifique se a resposta está ok (status 200)
        if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
        
        // Converta a resposta para JSON
        const data = await response.json();

        data.forEach(item => {
          
            // Preencha o formulário com osn dados retornados (exemplo)
            document.getElementById("editarNome").value = item.nome; // Preencher nome
            document.getElementById("editarDescricao").value = item.descricao; // Preencher data de nascimento
            document.getElementById("editarQuantidade").value = item.quantidade; // Preencher email
            document.getElementById("editarPreco").value = item.preco; //Prencher numero de telefone
        })

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao buscar produto');
    }

    document.getElementById('ProdutoEditForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do formulário
        
        // Obtemos os valores dos campos do formulário
        const editClienteData = {
            nome: document.getElementById('editarNome').value,
            descricao: document.getElementById('editarDescricao').value,
            quantidade: document.getElementById('editarQuantidade').value,
            preco: document.getElementById('editarPreco').value
        };
        
        // Chama a função postData para enviar os dados
        putData(api + '/updateProduto',id, editClienteData);
    });
}

// Função para atualizar dados (PUT), requer o ID como parâmetro
async function putData(url, id, data) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
        
        const result = await response.json();
        alertMessage("Dados atualizados com sucesso");
        return result;
    } catch (error) {
        alertMessage('Erro ao atualizar dados:')
    }
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
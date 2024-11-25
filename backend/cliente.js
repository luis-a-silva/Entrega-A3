const api ="http:\\localhost:8800";

async function fetchData() {
    try {
        // Faça a requisição para a API
        const response = await fetch(api + '/getUsers');
        
        // Verifique se a resposta está ok (status 200)
        if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
        
        // Converta a resposta para JSON
        const data = await response.json();

        // Obtenha o elemento tbody da tabela
        const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];

        // Para cada item no JSON, crie uma nova linha e insira as células
        data.forEach(item => {
            const row = document.createElement('tr');

            // Preencha as células com os dados do JSON
            const cellNome = document.createElement('td');
            cellNome.textContent = item.nome;
            row.appendChild(cellNome);

            const cellDataNascimento = document.createElement('td');
            cellDataNascimento.textContent = formatarData(item.data_nascimento);
            row.appendChild(cellDataNascimento);

            const cellEmail = document.createElement('td');
            cellEmail.textContent = item.email;
            row.appendChild(cellEmail);

            const cellNumero = document.createElement('td');
            cellNumero.textContent = formatarTelefone(item.numero_tel);
            row.appendChild(cellNumero);

            const acoesBtn = document.createElement('td');
            acoesBtn.innerHTML = `<button onclick="btnDeleteHandler(${item.id})" class="icon" title="Apagar"><i class="material-icons">delete</i></button><button class="icon" title="Editar" id=editar onclick="btnEditarHandler(${item.id})"><i class="material-icons">edit</i></button>`
            row.appendChild(acoesBtn);

            // Adicione a linha à tabela
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

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
document.getElementById('clienteForm').addEventListener('submit', function(event) {
event.preventDefault(); // Impede o comportamento padrão do formulário

// Obtemos os valores dos campos do formulário
const clienteData = {
    nome: document.getElementById('nome').value,
    data_nascimento: document.getElementById('data_nasc').value,
    email: document.getElementById('email').value,
    numero_tel: document.getElementById('numero_tel').value
};

// Chama a função postData para enviar os dados
postData(api + '/addUser', clienteData); // Altere a URL conforme a necessidade
});


function btnDeleteHandler(item){
    const id =  item;
    var confirmDelete = confirm('Deseja deletar cliente? ');
    if(confirmDelete) {
        deleteData(api + "/deleteUser", id);
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
        const response = await fetch(`${api}/getUserById/${id}`);
        
        // Verifique se a resposta está ok (status 200)
        if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
        
        // Converta a resposta para JSON
        const data = await response.json();

        data.forEach(item => {
            console.log(item.nome);
            console.log(item.data_nascimento);
            console.log(item.email);
            console.log(item.numero_tel);
            // Preencha o formulário com osn dados retornados (exemplo)
            document.getElementById("editarNome").value = item.nome; // Preencher nome
            document.getElementById("editarData_nasc").value = formatarData2(item.data_nascimento); // Preencher data de nascimento
            document.getElementById("editarEmail").value = item.email; // Preencher email
            document.getElementById("editarNumero_tel").value = item.numero_tel; //Prencher numero de telefone
        })

    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        alert('Erro ao buscar cliente');
    }

    document.getElementById('clienteEditForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do formulário
        
        // Obtemos os valores dos campos do formulário
        const editClienteData = {
            nome: document.getElementById('editarNome').value,
            data_nascimento: document.getElementById('editarData_nasc').value,
            email: document.getElementById('editarEmail').value,
            numero_tel: document.getElementById('editarNumero_tel').value
        };
        
        // Chama a função postData para enviar os dados
        putData(api + '/updateUser',id, editClienteData);
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
//seleciona a nossa ul com a lista de tarefas no html
const tarefas = document.getElementById("listaTarefas");
//faz uma requisição get para a API externa buscar as tarefas
fetch("https://crudcrud.com/api/2002ec1b7c57431ba8a6b8550de9ec5d/tarefas")
.then(resposta => resposta.json()) // cconverte o corpo da resposta em json
.then((listaDeTarefas) => {
    // itera sobre acada tarefa do array
    listaDeTarefas.forEach(tarefa => {
        //cria um novo elemento de li para cada tarefa
        const item = document.createElement("li");
        //define o conteúdo html do item, incluindo descrição e btn
        item.innerHTML = `${tarefa.descricao} <button onclick="remove('${tarefa._id}', this)">Concluído</button>`
        //adiciona um novo item à lista de tarefas no html
        tarefas.appendChild(item);
    });
});
//adiciona um ouvinete de evento de click no botão add
document.getElementById("add").addEventListener("click", () => {
    //pega a descrição que o usuário adicionou no input com id tarefa
    const descricao = document.getElementById("tarefa").value;
    fetch("https://crudcrud.com/api/2002ec1b7c57431ba8a6b8550de9ec5d/tarefas", {
        //definimos como POST, mas podemos usar GET, POST, PUT e DELETE
        method: "POST",
        //Definimos os cabeçalhos da requisição, com o tipo do conteúdo json
        headers: {
            "Content-Type": "application/json"
        },
        //convertemos um objeto js para uma string json e passamos no corpo
        body: JSON.stringify({descricao: descricao})
    })
    .then(resposta => resposta.json())
    .then((tarefa) => {
        //cria um novo elemento de li para cada tarefa
        const item = document.createElement("li");
        //define o conteúdo html do item, incluindo descrição e btn
        item.innerHTML = `${tarefa.descricao} <button onclick="remove('${tarefa._id}', this)">Concluído</button>`
        //adiciona um novo item à lista de tarefas no html
        tarefas.appendChild(item);
    })

})

function remove(id, elementoBotao) {
    // 1. Avisar o servidor que o item deve ser deletado
    fetch(`https://crudcrud.com/api/2002ec1b7c57431ba8a6b8550de9ec5d/tarefas/${id}`, { method: 'DELETE' });

    // 2. Achar o "Pai" do botão (que é o <li>) e removê-lo
    const liParaRemover = elementoBotao.parentElement; 
    
    // Adiciona uma animação suave 
    liParaRemover.style.opacity = '0';
    
    // Remove do HTML após 300ms (tempo da animação)
    setTimeout(() => {
        liParaRemover.remove();
    }, 300);
    
    console.log(`Tarefa ${id} removida com sucesso!`);
}
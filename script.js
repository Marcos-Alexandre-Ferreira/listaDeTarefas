//seleciona a nossa ul com a lista de tarefas no html
const tarefas = document.getElementById("listaTarefas");
//faz uma requisição get para a API externa buscar as tarefas
fetch("https://crudcrud.com/api/3f53559c23f449e1a2e240b81d088c4c/tarefas")
.then(resposta => resposta.json()) // cconverte o corpo da resposta em json
.then((listaDeTarefas) => {
    // itera sobre acada tarefa do array
    listaDeTarefas.forEach(tarefa => {
        //cria um novo elemento de li para cada tarefa
        const item = document.createElement("li");
        //define o conteúdo html do item, incluindo descrição e btn
        item.innerHTML = `${tarefa.descricao} <button>X</button>`
        //adiciona um novo item à lista de tarefas no html
        tarefas.appendChild(item);
    });
});

document.getElementById("add").addEventListener("click", () => {

    const descricao = document.getElementById("tarefa").value;
    fetch("https://crudcrud.com/api/3f53559c23f449e1a2e240b81d088c4c/tarefas", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({descricao: descricao})
    })
    .then(resposta => resposta.json())
    .then((tarefa) => {
        //cria um novo elemento de li para cada tarefa
        const item = document.createElement("li");
        //define o conteúdo html do item, incluindo descrição e btn
        item.innerHTML = `${tarefa.descricao} <button>X</button>`
        //adiciona um novo item à lista de tarefas no html
        tarefas.appendChild(item);
    })

})
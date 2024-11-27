// Adicionar nova tarefa
document.getElementById("adicionarTarefa").addEventListener("click", function () {
    const tarefaInput = document.getElementById("novaTarefa");
    const tarefaTexto = tarefaInput.value;
    const dataSelecionada = document.getElementById("calendario").value; // Obtém a data selecionada

    if (tarefaTexto && dataSelecionada) {
        const tarefa = {
            texto: tarefaTexto,
            data: dataSelecionada,
            concluida: false
        };

        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        tarefas.push(tarefa);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        adicionarTarefaNaLista(tarefa); // Adiciona na interface
        tarefaInput.value = ""; // Limpa o campo
    }
});

// Carregar tarefas ao iniciar a página
document.addEventListener("DOMContentLoaded", function () {
    carregarTarefas();
});

// Filtrar tarefas com base na data selecionada no calendário
document.getElementById("calendario").addEventListener("change", function () {
    carregarTarefas();
});

// Função para carregar tarefas
function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const listaAfazeres = document.getElementById("listaAfazeres");
    const dataSelecionada = document.getElementById("calendario").value; // Data atual do calendário

    listaAfazeres.innerHTML = ''; // Limpa a lista

    // Filtrar e exibir as tarefas da data selecionada
    const tarefasFiltradas = tarefas.filter(tarefa => tarefa.data === dataSelecionada);
    tarefasFiltradas.forEach(adicionarTarefaNaLista);
}

// Função para adicionar tarefa na interface
function adicionarTarefaNaLista(tarefa) {
    const listaAfazeres = document.getElementById("listaAfazeres");
    const li = document.createElement("li");

    li.innerHTML = `
        <input type="checkbox" class="checkbox" ${tarefa.concluida ? "checked" : ""}> 
        ${tarefa.texto} 
        <button class="delete">Excluir</button>
    `;

    const checkbox = li.querySelector(".checkbox");
    checkbox.addEventListener("click", function () {
        tarefa.concluida = checkbox.checked;
        li.classList.toggle("done", checkbox.checked);
        salvarTarefas();
    });

    li.querySelector(".delete").addEventListener("click", function () {
        li.classList.add("explosao");
        setTimeout(() => {
            li.remove();
            let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
            tarefas = tarefas.filter(t => t.texto !== tarefa.texto || t.data !== tarefa.data);
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
        }, 500);
    });

    listaAfazeres.appendChild(li);
}

// Função para salvar todas as tarefas no localStorage
function salvarTarefas() {
    const listaAfazeres = document.querySelectorAll("#listaAfazeres li");
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    listaAfazeres.forEach(li => {
        const texto = li.textContent.replace("Excluir", "").trim();
        const checkbox = li.querySelector(".checkbox");
        const tarefaExistente = tarefas.find(t => t.texto === texto);

        if (tarefaExistente) {
            tarefaExistente.concluida = checkbox.checked;
        }
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

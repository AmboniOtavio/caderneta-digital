document.getElementById("adicionarTarefa").addEventListener("click", function() {
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

      const li = document.createElement("li");
      li.innerHTML = `
          <input type="checkbox" class="checkbox"> ${tarefaTexto} 
          <button class="delete">Excluir</button>
      `;

      const checkbox = li.querySelector(".checkbox");
      checkbox.addEventListener("click", function() {
          tarefa.concluida = checkbox.checked;
          li.classList.toggle("done", checkbox.checked);
          localStorage.setItem("tarefas", JSON.stringify(tarefas));
      });

      li.querySelector(".delete").addEventListener("click", function() {
          li.classList.add("explosao");
          setTimeout(() => {
              li.remove();
              tarefas = tarefas.filter(t => t.texto !== tarefaTexto);
              localStorage.setItem("tarefas", JSON.stringify(tarefas));
          }, 500);
      });

      li.style.opacity = 0;
      document.getElementById("listaAfazeres").appendChild(li);

      setTimeout(() => {
          li.style.transition = "opacity 0.5s ease-out";
          li.style.opacity = 1;
      }, 10);

      tarefaInput.value = "";
  }
});

// Exibir as tarefas ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  const listaAfazeres = document.getElementById("listaAfazeres");
  const dataSelecionada = document.getElementById("calendario").value; // Pega a data selecionada no calendário

  listaAfazeres.innerHTML = ''; // Limpar lista ao recarregar

  // Filtra as tarefas pela data selecionada
  const tarefasFiltradas = tarefas.filter(tarefa => tarefa.data === dataSelecionada);

  tarefasFiltradas.forEach(tarefa => {
      const li = document.createElement("li");
      li.innerHTML = `
          <input type="checkbox" class="checkbox" ${tarefa.concluida ? "checked" : ""}> 
          ${tarefa.texto} 
          <button class="delete">Excluir</button>
      `;

      const checkbox = li.querySelector(".checkbox");
      checkbox.addEventListener("click", function() {
          tarefa.concluida = checkbox.checked;
          li.classList.toggle("done", checkbox.checked);
          localStorage.setItem("tarefas", JSON.stringify(tarefas));
      });

      li.querySelector(".delete").addEventListener("click", function() {
          li.classList.add("explosao");
          setTimeout(() => {
              li.remove();
              tarefas = tarefas.filter(t => t.texto !== tarefa.texto);
              localStorage.setItem("tarefas", JSON.stringify(tarefas));
          }, 500);
      });

      listaAfazeres.appendChild(li);
  });
});

// Filtrar tarefas com base na data selecionada no calendário
document.getElementById("calendario").addEventListener("change", function() {
  const dataSelecionada = this.value;
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  const listaAfazeres = document.getElementById("listaAfazeres");

  listaAfazeres.innerHTML = ''; // Limpa a lista de tarefas

  const tarefasFiltradas = tarefas.filter(tarefa => tarefa.data === dataSelecionada); // Filtra pela data

  tarefasFiltradas.forEach(tarefa => {
      const li = document.createElement("li");
      li.innerHTML = `
          <input type="checkbox" class="checkbox" ${tarefa.concluida ? "checked" : ""}> 
          ${tarefa.texto} 
          <button class="delete">Excluir</button>
      `;

      const checkbox = li.querySelector(".checkbox");
      checkbox.addEventListener("click", function() {
          tarefa.concluida = checkbox.checked;
          li.classList.toggle("done", checkbox.checked);
          localStorage.setItem("tarefas", JSON.stringify(tarefas));
      });

      li.querySelector(".delete").addEventListener("click", function() {
          li.classList.add("explosao");
          setTimeout(() => {
              li.remove();
              tarefas = tarefas.filter(t => t.texto !== tarefa.texto);
              localStorage.setItem("tarefas", JSON.stringify(tarefas));
          }, 500);
      });

      listaAfazeres.appendChild(li);
  });
});

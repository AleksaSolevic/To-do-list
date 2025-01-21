document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById('input') as HTMLInputElement;
  const addBtn = document.getElementById('btn') as HTMLButtonElement;
  const deleteAllBtn = document.getElementById('delete_all') as HTMLButtonElement;
  const todoList = document.getElementById('todo_list') as HTMLUListElement;

  interface Todo {
      id: number;
      task: string;
      complete: boolean;
  }

  let list: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
  let id: number = list.length ? Math.max(...list.map(todo => todo.id)) + 1 : 0;


  addBtn.addEventListener('click', addItem);
  deleteAllBtn.addEventListener('click', deleteAllItems);
  input.addEventListener('keypress', (e) => e.key === "Enter" && addItem());

  function addItem() {
      const task = input.value.trim();
      if (!task) {
          alert("Please enter a task!");
          return;
      }

      list.push({ id: id++, task, complete: false });
      input.value = "";
      saveAndRender();
  } 

function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(list));
  renderTodos();
}

function renderTodos() {
  todoList.innerHTML = "";
  list.forEach(todo => {
      const li = document.createElement('li');
      li.className = todo.complete ? "completed" : "";

      li.innerHTML = `
          <div class="todo-content">
              <input type="checkbox" ${todo.complete ? "checked" : ""} data-id="${todo.id}">
              <span>${todo.task}</span>
          </div>
          <div class="todo-actions">
              <button class="edit" data-id="${todo.id}">✏️</button>
              <button class="delete" data-id="${todo.id}">❌</button>
          </div>
      `;

      li.querySelector("input")!.addEventListener("change", () => toggleComplete(todo.id));
      li.querySelector(".edit")!.addEventListener("click", () => editItem(todo.id));
      li.querySelector(".delete")!.addEventListener("click", () => deleteItem(todo.id));

      todoList.appendChild(li);
  });

  deleteAllBtn.classList.toggle("hidden", list.length === 0);
}

  function toggleComplete(id: number) {
        list = list.map(todo => todo.id === id ? { ...todo, complete: !todo.complete } : todo);
        saveAndRender();
    }

    function editItem(id: number) {
        const task = prompt("Edit your task:", list.find(todo => todo.id === id)?.task);
        if (task?.trim()) {
            list = list.map(todo => (todo.id === id ? { ...todo, task: task.trim() } : todo));
            saveAndRender();
        }
    }

    function deleteItem(id: number) {
        list = list.filter(todo => todo.id !== id);
        saveAndRender();
    }

    function deleteAllItems() {
        if (confirm("Are you sure you want to clear all tasks?")) {
            list = [];
            saveAndRender();
        }
    }

    renderTodos();
  
});

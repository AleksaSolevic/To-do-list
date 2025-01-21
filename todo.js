document.addEventListener("DOMContentLoaded", function () {
    var input = document.getElementById('input');
    var addBtn = document.getElementById('btn');
    var deleteAllBtn = document.getElementById('delete_all');
    var todoList = document.getElementById('todo_list');
    var list = JSON.parse(localStorage.getItem('todos') || '[]');
    var id = list.length ? Math.max.apply(Math, list.map(function (todo) { return todo.id; })) + 1 : 0;
    addBtn.addEventListener('click', addItem);
    // deleteAllBtn.addEventListener('click', deleteAllItems);
    input.addEventListener('keypress', function (e) { return e.key === "Enter" && addItem(); });
    function addItem() {
        var task = input.value.trim();
        if (!task) {
            alert("Please enter a task!");
            return;
        }
        list.push({ id: id++, task: task, complete: false });
        input.value = "";
        saveAndRender();
    }
    function saveAndRender() {
        localStorage.setItem("todos", JSON.stringify(list));
        renderTodos();
    }
    function renderTodos() {
        todoList.innerHTML = "";
        list.forEach(function (todo) {
            var li = document.createElement('li');
            li.className = todo.complete ? "completed" : "";
            li.innerHTML = "\n          <div class=\"todo-content\">\n              <input type=\"checkbox\" ".concat(todo.complete ? "checked" : "", " data-id=\"").concat(todo.id, "\">\n              <span>").concat(todo.task, "</span>\n          </div>\n          <div class=\"todo-actions\">\n              <button class=\"edit\" data-id=\"").concat(todo.id, "\">\u270F\uFE0F</button>\n              <button class=\"delete\" data-id=\"").concat(todo.id, "\">\u274C</button>\n          </div>\n      ");
            todoList.appendChild(li);
        });
    }
});

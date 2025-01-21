var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
document.addEventListener("DOMContentLoaded", function () {
    var input = document.getElementById('input');
    var addBtn = document.getElementById('btn');
    var deleteAllBtn = document.getElementById('delete_all');
    var todoList = document.getElementById('todo_list');
    var list = JSON.parse(localStorage.getItem('todos') || '[]');
    var id = list.length ? Math.max.apply(Math, list.map(function (todo) { return todo.id; })) + 1 : 0;
    addBtn.addEventListener('click', addItem);
    deleteAllBtn.addEventListener('click', deleteAllItems);
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
            li.querySelector("input").addEventListener("change", function () { return toggleComplete(todo.id); });
            li.querySelector(".edit").addEventListener("click", function () { return editItem(todo.id); });
            li.querySelector(".delete").addEventListener("click", function () { return deleteItem(todo.id); });
            todoList.appendChild(li);
        });
        deleteAllBtn.classList.toggle("hidden", list.length === 0);
    }
    function toggleComplete(id) {
        list = list.map(function (todo) { return todo.id === id ? __assign(__assign({}, todo), { complete: !todo.complete }) : todo; });
        saveAndRender();
    }
    function editItem(id) {
        var _a;
        var task = prompt("Edit task:", (_a = list.find(function (todo) { return todo.id === id; })) === null || _a === void 0 ? void 0 : _a.task);
        if (task === null || task === void 0 ? void 0 : task.trim()) {
            list = list.map(function (todo) { return (todo.id === id ? __assign(__assign({}, todo), { task: task.trim() }) : todo); });
            saveAndRender();
        }
    }
    function deleteItem(id) {
        list = list.filter(function (todo) { return todo.id !== id; });
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

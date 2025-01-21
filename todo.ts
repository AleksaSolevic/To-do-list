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

});

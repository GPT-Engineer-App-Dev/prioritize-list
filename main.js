// Get DOM elements
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

// Todos array
let todos = [];

// Load todos from localStorage
const savedTodos = JSON.parse(localStorage.getItem("todos"));
if (Array.isArray(savedTodos)) {
  todos = savedTodos;
}

// Render todos
function renderTodos() {
  todoList.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    todoList.innerHTML += `
            <li class="flex items-center py-2">
                <input type="checkbox" class="checkbox mr-2" id="todo-${i}" ${todo.completed ? "checked" : ""} data-index="${i}">
                <label for="todo-${i}" class="todo-text">${todo.text}</label>
                <button class="delete-btn ml-auto text-red-500" data-index="${i}">Delete</button>
            </li>
        `;
  }
}

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Add todo
addBtn.addEventListener("click", () => {
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    todos.push({
      text: todoText,
      completed: false,
    });
    todoInput.value = "";
    renderTodos();
    saveTodos();
  }
});

// Mark todo as complete
todoList.addEventListener("change", (event) => {
  if (event.target.type === "checkbox") {
    const index = event.target.dataset.index;
    todos[index].completed = event.target.checked;
    renderTodos();
    saveTodos();
  }
});

// Delete todo
todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const index = event.target.dataset.index;
    todos.splice(index, 1);
    renderTodos();
    saveTodos();
  }
});

// Initial render
renderTodos();

const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

let todos = [];
let _id = 0;

const setTodos = (newTodos) => {
  todos = newTodos;
};

const addTodo = (newTodo) => {
  let newId = _id++;

  let tmpTodo = {
    id: newId,
    isComplete: false,
    content: newTodo,
  };

  setTodos([...todos, tmpTodo]);

  paintTodos();
};

const paintTodos = () => {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    todoList.innerHTML += `
  <li class="todo-item">
    // <div class="checkbox">✔</div>
    <div class="todo">${todo.content}</div>
    <button class="delBtn">x</button>
  </li>`;
  });
};

const init = () => {
  todoInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      addTodo(e.target.value);
      ``;
    }
  });
};

init();

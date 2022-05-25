const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

let todos = [];
let id = 0;

const setTodos = () => {
  localStorage.setItem("TODO_LIST", JSON.stringify(todos));
};

const addTodo = (newTodo) => {
  let newId = id++;

  let tmpTodo = {
    id: newId,
    isComplete: false,
    content: newTodo,
  };

  todos = [...todos, tmpTodo];

  paintTodos();
};

const paintTodos = () => {
  todoList.innerHTML = "";

  todos
    ? todos.forEach((todo) => {
        const todoItemElem = document.createElement("li");
        todoItemElem.className = "todo-item";

        const checkboxElem = document.createElement("div");
        checkboxElem.className = "checkbox";
        checkboxElem.addEventListener("click", () => {
          checkTodo(todo.id);
        });

        const todoElem = document.createElement("div");
        todoElem.className = "todo";
        todoElem.innerText = todo.content;

        const delBtnElem = document.createElement("button");
        delBtnElem.className = "delBtn";
        delBtnElem.innerHTML = "X";
        delBtnElem.addEventListener("click", () => {
          deleteTodo(todo.id);
        });

        if (todo.isComplete) {
          todoItemElem.classList.add("checked");
          checkboxElem.innerText = "✔";
        }

        todoItemElem.appendChild(checkboxElem);
        todoItemElem.appendChild(todoElem);
        todoItemElem.appendChild(delBtnElem);

        todoList.appendChild(todoItemElem);
      })
    : "";

  setTodos();
};

const deleteTodo = (todoId) => {
  const newTodos = todos.filter((todo) => todo.id !== todoId);

  todos = newTodos;
  paintTodos();
};

const checkTodo = (todoId) => {
  const newTodos = todos.map((todo) => {
    if (todo.id === todoId) {
      return {
        ...todo,
        isComplete: !todo.isComplete,
      };
    }

    return todo;
  });

  todos = newTodos;
  paintTodos();
};

const getTodos = () => {
  const storageTodos = localStorage.getItem("TODO_LIST");

  if (storageTodos) {
    todos = JSON.parse(storageTodos);
    paintTodos();
  }
};

const init = () => {
  getTodos();

  todoInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      addTodo(e.target.value);
      todoInput.value = "";
    }
  });
};

init();

const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

let todos = [];
let id = 0;

const setTodos = (newTodos) => {
  todos = newTodos;
};

const getTodos = () => {
  return todos;
};

const addTodo = (newTodo) => {
  let newId = id++;

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
  });
};

const deleteTodo = (todoId) => {
  const newTodos = getTodos().filter((todo) => todo.id !== todoId);

  setTodos(newTodos);
  paintTodos();
};

const checkTodo = (todoId) => {
  const newTodos = getTodos().map((todo) => {
    if (todo.id === todoId) {
      return {
        ...todo,
        isComplete: !todo.isComplete,
      };
    }

    return todo;
  });

  setTodos(newTodos);
  paintTodos();
};

const init = () => {
  todoInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      addTodo(e.target.value);
      todoInput.value = "";
    }
  });
};

init();

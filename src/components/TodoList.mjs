export default class TodoList {
  constructor({
    $todoBox,
    todos,
    checkTodoHandler,
    deleteTodoHandler,
    editTodoHandler,
  }) {
    this.$todoBox = $todoBox;
    this.todos = todos;
    this.checkTodoHandler = checkTodoHandler;
    this.deleteTodoHandler = deleteTodoHandler;
    this.editTodoHandler = editTodoHandler;

    this.$todoListElem = document.createElement("div");
    this.$todoListElem.className = "todo-list";
    this.$todoBox.appendChild(this.$todoListElem);

    this.render();
  }

  setTodos(newTodos) {
    this.todos = newTodos;
    this.render();
  }

  dbClickHandler(e, todoId) {
    e.preventDefault();

    const todoElem = e.target;
    const inputText = e.target.innerText;
    const todoItemElem = todoElem.parentNode;
    const inputElem = document.createElement("input");
    inputElem.value = inputText;
    inputElem.classList.add("todo-input");

    inputElem.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        console.log(e.target);
        this.editTodoHandler(e.target, todoId);
      }
    });

    const onClickBody = (e) => {
      if (e.target !== inputElem) {
        todoItemElem.removeChild(inputElem);
        document.body.removeEventListener("click", onClickBody);
      }
    };

    const clickHandler = (e) => {
      if (e.target !== inputElem) {
        this.editTodoHandler(inputElem, todoId);
        document.body.removeEventListener("click", clickHandler);
      }
    };

    document.body.addEventListener("click", clickHandler);

    todoItemElem.replaceChild(inputElem, todoElem);

    inputElem.focus();
  }

  createElement() {
    this.todos.forEach((todo) => {
      const todoItemElem = document.createElement("li");
      todoItemElem.className = "todo-item";

      const checkboxElem = document.createElement("div");
      checkboxElem.className = "checkbox";
      checkboxElem.addEventListener("click", () => {
        this.checkTodoHandler(todo.id);
      });

      const todoElem = document.createElement("div");
      todoElem.className = "todo";
      todoElem.innerText = todo.content;
      todoElem.addEventListener("dblclick", (e) => {
        this.dbClickHandler(e, todo.id);
      });

      const delBtnElem = document.createElement("button");
      delBtnElem.className = "delBtn";
      delBtnElem.innerHTML = "X";
      delBtnElem.addEventListener("click", () => {
        this.deleteTodoHandler(todo.id);
      });

      if (todo.isComplete) {
        todoItemElem.classList.add("checked");
        checkboxElem.innerText = "✔";
      }

      todoItemElem.appendChild(checkboxElem);
      todoItemElem.appendChild(todoElem);
      todoItemElem.appendChild(delBtnElem);

      this.$todoListElem.appendChild(todoItemElem);
    });
  }

  render() {
    this.$todoListElem.innerHTML = "";
    this.createElement();
  }
}

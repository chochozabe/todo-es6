export default class TodoList {
  constructor({ $todoBox, todos, checkTodoHandler, deleteTodoHandler }) {
    this.$todoBox = $todoBox;
    this.todos = todos;
    this.checkTodoHandler = checkTodoHandler;
    this.deleteTodoHandler = deleteTodoHandler;

    this.$todoListElem = document.createElement("div");
    this.$todoListElem.className = "todo-list";
    this.$todoBox.appendChild(this.$todoListElem);

    this.createElement();
  }

  setTodos(newTodos) {
    this.todos = newTodos;
    this.render();
  }

  createElement() {
    this.$todoListElem.innerHTML = "";

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
}

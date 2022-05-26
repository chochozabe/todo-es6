export default class TodoInput {
  constructor({ $todoBox, addTodoHandler }) {
    this.$todoBox = $todoBox;
    this.addTodoHandler = addTodoHandler;

    this.render();
  }

  createElement() {
    const todoInputElem = document.createElement("div");
    todoInputElem.className = "todo-box-input";

    todoInputElem.innerHTML = `
        <button class="complete-all-btn">✔</button>
        <input
            type="text"
            class="todo-input"
            placeholder="What needs to be done?"
        />`;

    todoInputElem.addEventListener("keypress", (e) => {
      if (e.key == "Enter" && e.target.value.trim()) {
        this.addTodoHandler(e);
        e.target.value = "";
      }
    });

    return todoInputElem;
  }

  render() {
    this.$todoBox.appendChild(this.createElement());
  }
}

import TodoInput from "./components/TodoInput.mjs";
import TodoList from "./components/TodoList.mjs";

import { ID as newId } from "./utils/ramdomId.mjs";

export default class App {
  constructor({ $todoBox }) {
    this.todos = [];

    this.todoInput = new TodoInput({
      $todoBox,
      addTodoHandler: (e) => this.addTodoHandler(e),
    });

    this.todoList = new TodoList({
      $todoBox,
      todos: this.todos,
      checkTodoHandler: (todoId) => this.checkTodoHandler(todoId),
      deleteTodoHandler: (todoId) => this.deleteTodoHandler(todoId),
    });

    this.init();
  }

  setTodos(newTodos) {
    console.log(newTodos);
    this.todos = newTodos;
    this.todoList.setTodos(this.todos);
    this.saveTodos();
  }

  saveTodos() {
    localStorage.setItem("TODO_LIST", JSON.stringify(this.todos));
  }

  addTodoHandler(e) {
    e.preventDefault();

    let newTodo = e.target.value;

    let tmpTodo = {
      id: newId(),
      isComplete: false,
      content: newTodo,
    };

    this.setTodos([...this.todos, tmpTodo]);
  }

  deleteTodoHandler(todoId) {
    const newTodos = this.todos.filter((todo) => todo.id !== todoId);

    this.setTodos(newTodos);
  }

  checkTodoHandler(todoId) {
    console.log(todoId);
    const newTodos = this.todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isComplete: !todo.isComplete,
        };
      }

      return todo;
    });

    this.setTodos(newTodos);
  }

  getTodos() {
    const storageTodos = localStorage.getItem("TODO_LIST");

    if (storageTodos) {
      this.setTodos(JSON.parse(storageTodos));
    }
  }

  init = () => {
    this.getTodos();
  };
}

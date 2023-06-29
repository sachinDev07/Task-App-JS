class Todo {
  constructor() {
    this.todos = [];
  }

  addTodo(value) {
    this.todos.push({
      id: parseInt(Math.random() * 1000).toString(),
      value
    });
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  updateTodo(id, value) {
    if (!value) {
      alert("Todo name is necessary!.");
    }
  
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, value }; 
      }
      return todo;
    });
  }
  
  isEmpty() {
    return this.todos.length === 0;
  }

  getTodos() {
    return this.todos;
  }

  setTodos(todos) {
    this.todos = todos;
  }
}

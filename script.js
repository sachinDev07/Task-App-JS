const todo = new Todo();
const todoInput = document.querySelector("#getTodoInput");
const todoList = document.querySelector(".todo_list");
const key = "todoStorage";

const updateLocalStorage = () => {
  localStorage.setItem(key, JSON.stringify(todo.getTodos()));
};

const emptyTodoInput = () => {
  todoInput.value = "";
};

const renderList = () => {
  todoList.innerHTML = ""; // Clear the existing list

  for (const todoItem of todo.todos) {
    const LI = document.createElement("li");
    const DIV = document.createElement("div");
    const INPUT = document.createElement("input");
    const SPAN = document.createElement("span");

    DIV.classList.add("inputBox");
    INPUT.type = "text";
    INPUT.setAttribute("disabled", "");
    INPUT.setAttribute("Id", `input${todoItem.id}`);
    INPUT.setAttribute("onkeyUp", "onInputEdit(event)");
    INPUT.value = todoItem.value;
    SPAN.classList.add("crossIcon");
    SPAN.innerText = "X";
    SPAN.setAttribute("id", todoItem.id);

    const childNodes = [INPUT, SPAN];
    for (const childNode of childNodes) {
      DIV.appendChild(childNode);
    }

    LI.appendChild(DIV);
    todoList.appendChild(LI);
  }

  updateLocalStorage();
};

function onInputEdit(e) {
  if (e.key != "Enter") return;
  const id = e.target.id.slice(5);
  if (!id) return;
  const value = e.target.value;
  todo.updateTodo(id, value);

  renderList();
}

function makeInputEditable(e) {
  const id = e.target.id;
  if (!id) return;
  const inputBox = document.querySelector("#" + id);
  inputBox.removeAttribute("disabled");
}

function addTodo() {
  const inputValue = todoInput.value;
  if (inputValue === "") {
    alert("Enter valid todo...");
    return;
  }

  todo.addTodo(inputValue);

  emptyTodoInput();
  renderList();
}

function handleClick(e) {
  if (e && e.target && e.target.id && e.target.nodeName === "SPAN") {
    todo.deleteTodo(e.target.id);
    renderList();
  }
}

(() => {
  const localTodos = localStorage.getItem(key);
  if (localTodos) {
    todo.setTodos(JSON.parse(localTodos));
    renderList();
  }
})();

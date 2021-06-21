// Main page elements
const todosEle = document.querySelector("ul");
const inputEle = document.querySelector("#input");
const formEle = document.querySelector("form");

// Global variables
const todos = JSON.parse(localStorage.getItem("todos")) || [];
let id = 0;

// On form submit action
formEle.addEventListener("submit", e => {
    e.preventDefault();
    const todo = createTodo(inputEle.value);
    addTodo(todo);
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    formEle.reset();
});

// On todos list click action
todosEle.addEventListener("click", e => {
    // Handles todo clicks
    if (e.target.tagName === "LI") {
        const index = findIndex(e.target);
        todos[index].completed = todos[index].completed ? false: true;
        e.target.classList.toggle("done");
        // Handles button clicks
    } else if (e.target.tagName === "BUTTON") {
        todos.splice(findIndex(e.target.parentElement), 1);
        e.target.parentElement.remove();
    }
    localStorage.setItem("todos", JSON.stringify(todos));
});

// Returns a todo object
function createTodo(name) {
    return {
        name,
        id: id++,
        completed: false
    };
}

// Adds a todo to the page
function addTodo(todo) {
    const newTodo = document.createElement("li");
    newTodo.innerText = todo.name;
    newTodo.className = todo.completed ? "done": "";
    newTodo.dataset.id = todo.id;
    const delButton = document.createElement("button");
    delButton.innerHTML = "&times;";
    newTodo.append(delButton);
    todosEle.append(newTodo);
}

// Returns index of selected element in todos array
function findIndex(ele) {
    let index;
    todos.forEach((todo, i) => {
        if (todo.id === parseInt(ele.dataset.id)) {
            index = i;
        }
    });
    return index;
}

// Fills in localstorage todos if any
todos.forEach(todo => {
    addTodo(todo);
});

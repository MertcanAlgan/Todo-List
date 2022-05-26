// Tüm Elementleri Seçme
var form = document.querySelector("#todo-form");
var todoInput = document.querySelector("#todo");
var todoList = document.querySelector(".list-group");
var firstCardBody = document.querySelector(".card-body")[0];
var secondCardBody = document.querySelector(".card-body-1");
var filter = document.querySelector("#filter");
var clearButton = document.querySelector("#clear-todos");

eventListeners();
// Tüm Event Listenerler 
function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click",deletetodo);
    filter.addEventListener("keyup",filtertodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
    if(confirm("Do yo want to clear all to-dos?")){
        // removing todos from list view
        todoList.innerHTML = "";
        localStorage.removeItem("todos");
    }
}


function filtertodos(e){
    var filterValue = e.target.value.toLowerCase();
    var listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        var text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block !important");
        }
    })
}

function deletetodo(e) { // delete todos

    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteStorage(e.target.parentElement.parentElement.textContent);
    }
}

function deleteStorage(deletetodo){ // delete todos from storage
    var todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1); // delete from array
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}


function addTodo(e) { // adding todos
    var newTodo = todoInput.value.trim();
    if (newTodo === "") {
        
    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
    }
    e.preventDefault();
}


function addTodoToUI(newTodo) { // adding list item
    // creating list item
    var listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";

    // creating a link
    var link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    // text node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);
    todoInput.value = "";
}

function getTodosFromStorage() { // getting todo from storage
    var todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo) { // adding todos to storage
    var todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() { // adding todos as list
    var todos = getTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });
}
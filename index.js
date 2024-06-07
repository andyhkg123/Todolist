window.addEventListener("load", () => {
  //////set variables

  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const tasks = document.querySelector("#taskbtn");
  const newTodoForm = document.querySelector("#addbtn");
  const clrStorage = document.querySelector("#clrbtn");

  //////tasks input to localStorage

  const tasks_stored = localStorage.getItem("tasksdata") || "";

  tasks.value = tasks_stored;

  tasks.addEventListener("change", (e) => {
    localStorage.setItem("tasksdata", e.target.value);
  });

  //////Priority input to localStorage

  const priority = document.querySelector("#prioritySelection");

  const priority_stored = localStorage.getItem("prioritydata") || "";

  priority.value = priority_stored;

  priority.addEventListener("change", (e) => {
    localStorage.setItem("prioritydata", e.target.value);
  });

  ///////Making Add button click////

  newTodoForm.addEventListener("click", () => {
    const todo = {
      content: tasks.value,
      priority: priority.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
    tasks.value = "";
    priority.value = "";

    displaytodo();
  });

  clrStorage.addEventListener("click", () => {
    localStorage.clear();
    todos = [];
    displaytodo();
  });
  //////////////
  displaytodo();
});

function displaytodo() {
  const todolist = document.querySelector(".right");
  todolist.innerHTML = "";

  todos.forEach((todo) => {
    const hoist = document.createElement("div");
    const blank = document.createElement("div");
    const todoContent = document.createElement("div");
    const todoPriority = document.createElement("div");
    const func = document.createElement("div");
    const checking = document.createElement("div");
    const checkingboxmessage = document.createElement("div");
    const checkbox = document.createElement("input");
    const todoEdit = document.createElement("div");
    const todoDel = document.createElement("div");

    hoist.classList.add("hoist");
    todoContent.classList.add("Task_content");
    todoPriority.classList.add("Task_priority");
    func.classList.add("function");
    checking.classList.add("checking");
    checkingboxmessage.classList.add("checkboxmessage");
    checkbox.type = "checkbox";
    checkbox.classList.add("todocheckbox");
    todoEdit.classList.add("Task_edit");
    todoDel.classList.add("Task_del");

    todolist.appendChild(hoist);
    hoist.appendChild(blank);
    hoist.appendChild(func);
    blank.appendChild(todoContent);
    blank.appendChild(todoPriority);
    func.appendChild(checking);
    checking.appendChild(checkingboxmessage);
    checking.innerHTML = "Done";
    checking.appendChild(checkbox);
    func.appendChild(todoEdit);
    func.appendChild(todoDel);

    todoContent.innerHTML = `${todo.content}`;
    todoPriority.innerHTML = `${todo.priority}`;
    todoEdit.innerHTML = `Edit`;
    todoDel.innerHTML = `Del`;
  });

  //todoEdit.addEventListener("click", function

  todoDel.addEventListener("click", (e) => {
    localStorage.removeItem("prioritydata", e.target.value);
  });
}

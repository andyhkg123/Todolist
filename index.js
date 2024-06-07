window.addEventListener("load", () => {
  //////set variables

  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const tasks = document.querySelector("#taskbtn");
  const newTodoForm = document.querySelector("#addbtn");
  const clrStorage = document.querySelector("#clrbtn");

  //////tasks input to localStorage

  const tasks_stored = localStorage.getItem("tasksdata") || "";

  tasks.value = tasks_stored;

  tasks.addEventListener("blur", (e) => {
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

  //////adding tasks
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
    blank.classList.add("blank");
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
    checking.appendChild(checkbox);
    func.appendChild(todoEdit);
    func.appendChild(todoDel);
    checkingboxmessage.innerHTML = "Unfinished";

    todoContent.innerHTML = `${todo.content}`;
    todoPriority.innerHTML = `${todo.priority}`;
    todoEdit.innerHTML = `Edit`;
    todoDel.innerHTML = `Del`;

    /////making checkboxes

    if (todo.done) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }

    checkbox.addEventListener("change", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));
      if (todo.done) {
        checkingboxmessage.innerHTML = "Done";
      } else {
        checkingboxmessage.innerHTML = "Unfinished";
      }
    });

    todoDel.addEventListener("click", () => {
      todos = todos.filter((x) => x !== todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      displaytodo();
    });
    todoEdit.addEventListener("click", () => {
      const EditContent = document.createElement("input");
      EditContent.type = "text";
      EditContent.value = todo.content;

      const EditPriority = document.createElement("select");
      const options = [
        { value: "High", text: "High" },
        { value: "Medium", text: "Medium" },
        { value: "Low", text: "Low" },
      ];
      options.forEach((optionData) => {
        const option = document.createElement("option");
        option.value = optionData.value;
        option.text = optionData.text;
        EditPriority.appendChild(option);
      });
      EditPriority.value = todo.priority;

      EditContent.classList.add("Task_content");
      EditPriority.classList.add("Task_priority");

      // Replace todoContent and todoPriority if they exist in the DOM
      if (blank.contains(todoContent)) {
        blank.replaceChild(EditContent, todoContent);
      }
      if (blank.contains(todoPriority)) {
        blank.replaceChild(EditPriority, todoPriority);
      }

      todoEdit.innerHTML = `Save`;

      todoEdit.addEventListener("click", function saveChanges() {
        todo.content = EditContent.value;
        todo.priority = EditPriority.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        displaytodo();

        // Remove the event listener to prevent multiple save operations
        todoEdit.removeEventListener("click", saveChanges);
      });
    });
  });
}

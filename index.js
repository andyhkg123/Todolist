window.addEventListener("load", () => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const tasks = document.querySelector("#taskbtn");
  const newTodoForm = document.querySelector("#addbtn");
  const clrStorage = document.querySelector("#clrbtn");
  let initial = 0; // Variable to track the current start index

  // Load and set tasks input from localStorage
  const tasks_stored = localStorage.getItem("tasksdata") || "";
  tasks.value = tasks_stored;

  tasks.addEventListener("blur", (e) => {
    localStorage.setItem("tasksdata", e.target.value);
  });

  // Load and set priority input from localStorage
  const priority = document.querySelector("#prioritySelection");
  const priority_stored = localStorage.getItem("prioritydata") || "";
  priority.value = priority_stored;

  priority.addEventListener("change", (e) => {
    localStorage.setItem("prioritydata", e.target.value);
  });

  // Add new task
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

    displayTodo();
  });

  // Clear localStorage and reset todos
  clrStorage.addEventListener("click", () => {
    localStorage.clear();
    todos = [];
    initial = 0;
    displayTodo();
  });

  // Display the current set of tasks
  function displayTodo() {
    const todolist = document.querySelector(".right");
    todolist.innerHTML = "";

    // Determine the end index
    let end = Math.min(initial + 5, todos.length);

    const notification = document.querySelector("#notification");
    if (todos.length > end) {
      notification.style.display = "block";
    } else {
      notification.style.display = "none";
    }

    // Display tasks from the current range
    for (let i = initial; i < end; i++) {
      const todo = todos[i];
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

      todoContent.innerHTML = `Task ${i + 1}:<br>${todo.content}`;
      todoPriority.innerHTML = `Priority:${todo.priority}`;
      todoEdit.innerHTML = `Edit`;
      todoDel.innerHTML = `Del`;

      if (todo.done) {
        checkbox.checked = true;
        checkingboxmessage.innerHTML = "Done";
      } else {
        checkbox.checked = false;
        checkingboxmessage.innerHTML = "Unfinished";
      }

      checkbox.addEventListener("change", (e) => {
        todo.done = e.target.checked;
        checkingboxmessage.innerHTML = todo.done ? "Done" : "Unfinished";
        localStorage.setItem("todos", JSON.stringify(todos));
      });

      todoDel.addEventListener("click", () => {
        todos = todos.filter((x) => x !== todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        displayTodo();
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
          displayTodo();
          todoEdit.removeEventListener("click", saveChanges);
        });
      });
    }
  }

  // Navigation for next and previous sets of tasks
  document.querySelector("#nextbtn").addEventListener("click", () => {
    if (initial + 5 < todos.length) {
      initial += 5;
      displayTodo();
    }
  });

  document.querySelector("#backbtn").addEventListener("click", () => {
    initial = Math.max(0, initial - 5);
    displayTodo();
  });

  displayTodo();
});

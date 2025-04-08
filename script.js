function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
  
    const taskList = document.getElementById("taskList");
  
    const li = document.createElement("li");
    li.textContent = taskText;
  
    // Toggle complete on click
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });
  
    // Right-click to delete
    li.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      li.remove();
      saveTasks();
    });
  
    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();
  }
  
  // Save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
      tasks.push({ text: li.textContent, completed: li.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  // Load saved tasks
  function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.text;
      if (task.completed) li.classList.add("completed");
  
      li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
      });
  
      li.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        li.remove();
        saveTasks();
      });
  
      document.getElementById("taskList").appendChild(li);
    });
  }
  
  loadTasks();
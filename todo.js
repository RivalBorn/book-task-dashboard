const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#new-task');
const taskList = document.querySelector('#task-list');
const taskCountSpan = document.querySelector('#task-count');

function updateTaskCount() {
  const taskCount = taskList.querySelectorAll('li').length;
  taskCountSpan.textContent = taskCount;
}

function createDeleteButton() {
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'delete-btn';
  deleteButton.textContent = 'Delete';
  return deleteButton;
}

function createTaskItem(taskText) {
  const item = document.createElement('li');

  const textSpan = document.createElement('span');
  textSpan.textContent = taskText;

  const deleteButton = createDeleteButton();

  item.append(textSpan, deleteButton);
  return item;
}

function addTask(taskText) {
  const cleanedTask = taskText.trim();

  if (!cleanedTask) {
    taskInput.focus();
    return;
  }

  const newTask = createTaskItem(cleanedTask);
  taskList.appendChild(newTask);
  taskInput.value = '';
  taskInput.focus();
  updateTaskCount();
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(taskInput.value);
});

taskList.addEventListener('click', (event) => {
  const clickedElement = event.target;
  const taskItem = clickedElement.closest('li');

  if (!taskItem) return;

  if (clickedElement.classList.contains('delete-btn')) {
    taskItem.remove();
    updateTaskCount();
    return;
  }

  taskItem.classList.toggle('done');
});

updateTaskCount();

// Define UI Vars
const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();
 
// Load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  tasklist.addEventListener('click', removeTask);
  // Clear tasks
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasks() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.forEach(function(text) {
    tasklist.appendChild(createListItem(text));
  })
  
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
    return;
  }

  // Create li element
  const li = createListItem(taskInput.value);

  // Append li to ul
  tasklist.insertAdjacentElement('beforeend', li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear the input
  taskInput.value = '';

  e.preventDefault(); // prevent default behavior - form submit
}

// Create Task <li> element
function createListItem(listItemTextCont) {
  // Create li element
  const li = document.createElement('li');
  // add class
  li.className = 'collection-item';
  // Create text node and append to the li
  li.appendChild(document.createTextNode(listItemTextCont));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  return li;
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove Tasks from LS
      removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeFromLocalStorage(taskItem) {
  let tasks;
  
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {      
    if(task === taskItem.firstChild.textContent) {
      tasks.splice(index, 1);
        
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
}

// Clear Tasks
function clearTasks() {
  // tasklist.innerHTML = '';

  // Faster
  while(tasklist.firstChild) {
    tasklist.removeChild(tasklist.firstChild);
  }

  clearTasksFromLocalStorage();
}

// Clear  Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}


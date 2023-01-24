const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');


form.addEventListener('submit', addTask);

tasksList.addEventListener('click', removeTask);
tasksList.addEventListener('click', doneTask);

function addTask(evt) {
  evt.preventDefault();
  let taskText = taskInput.value;

  const taskHtml = `
      <li class="list-group-item d-flex justify-content-between task-item">
        <span class="task-title">${taskText}</span>
        <div class="task-item__buttons">
          <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
          </button>
          <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
          </button>
        </div>
    </li>`;

  tasksList.insertAdjacentHTML('beforeend', taskHtml);

  taskInput.value = '';
  taskInput.focus();

  if (tasksList.children.length > 1) {
    emptyList.classList.add('none');
  }

  localStorage.setItem('Task', taskHtml);

}

function removeTask(evt) {
  if (evt.target.dataset.action === 'delete') {
    const parentNode = evt.target.closest('.list-group-item');
    parentNode.remove();

    if (tasksList.children.length === 1) {
      emptyList.classList.remove('none');
    }
  }
}

function doneTask(evt) {
  if (evt.target.dataset.action === 'done') {
    const parentNode = evt.target.closest('.list-group-item');
    parentNode.classList.toggle('task-title--done');
  }
}
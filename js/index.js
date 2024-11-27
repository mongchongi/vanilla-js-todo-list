const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoStatusFilter = document.querySelector('.todo-status-filter');
const todoSortOrder = document.querySelector('.todo-sort-order');

let todos = [];

const renderTodo = (data = todos) => {
  todoList.innerHTML = '';

  data.forEach((todo) => {
    const borderColor = todo.isDone && 'border-color: #73EC8B';
    const textDecoration = todo.isDone && 'text-decoration: line-through';

    const template = `
      <li class="todo-item">
        <div class="todo-checkbox" style="${borderColor}" data-id="${todo.id}"></div>
        <div class="todo-info">
          <span class="todo-status">${todo.isDone ? '완료' : '진행 중'}</span>
          <h4 class="todo-content" style="${textDecoration}">${todo.content}</h4>
          <p class="todo-createdAt" style="${textDecoration}">${todo.createdAt}</p>
        </div>
        <div class="todo-actions">
          <button type="button" class="todo-edit-btn" data-id="${todo.id}">수정</button>
          <button type="button" class="todo-delete-btn" data-id="${todo.id}">삭제</button>
        </div>
      </li>`;

    todoList.insertAdjacentHTML('beforeend', template);
  });
};

const handleAddTodo = (event) => {
  event.preventDefault();

  const id = Math.random().toString(36).substring(2, 10);
  const content = todoInput.value;
  const createdAt = new Date().toLocaleDateString('ko-kr', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const newTodo = {
    id,
    content,
    createdAt,
    isDone: false,
  };

  todos.unshift(newTodo);
  renderTodo();

  todoInput.value = '';
  todoInput.focus();
};

const handleClick = (event) => {
  const index = todos.findIndex((todo) => todo.id === event.target.dataset.id);

  if (event.target.className === 'todo-checkbox') {
    todos[index].isDone = !todos[index].isDone;
  } else if (event.target.className === 'todo-edit-btn') {
    const newContent = prompt('할 일 수정');

    if (newContent !== null) {
      todos[index].content = newContent;
    }
  } else if (event.target.className === 'todo-delete-btn') {
    todos.splice(index, 1);
  }

  renderTodo();
};

const handleStatusFilterTodo = (event) => {
  if (event.target.value === 'all') {
    renderTodo();
  } else if (event.target.value === 'in progress') {
    const inProgress = todos.filter((todo) => todo.isDone === false);
    renderTodo(inProgress);
  } else if (event.target.value === 'done') {
    const done = todos.filter((todo) => todo.isDone === true);
    renderTodo(done);
  }
};

const handleSortOrderTodo = (event) => {
  if (event.target.value === 'newest') {
    renderTodo();
  } else if (event.target.value === 'oldest') {
    const oldestTodos = [...todos];
    oldestTodos.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    renderTodo(oldestTodos);
  }
};

todoForm.addEventListener('submit', handleAddTodo);
todoList.addEventListener('click', handleClick);
todoStatusFilter.addEventListener('input', handleStatusFilterTodo);
todoSortOrder.addEventListener('input', handleSortOrderTodo);

const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

const todos = [
  { id: '12kxkasl', content: 'lorem', createdAt: '2024. 11. 27. 12:23:44', isDone: false },
  { id: 'kx1badop', content: 'dolor', createdAt: '2024. 11. 26. 12:13:44', isDone: true },
];

const renderTodo = () => {
  todoList.innerHTML = '';

  todos.forEach((todo) => {
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
          <button type="button" class="todo-edit-btn">수정</button>
          <button type="button" class="todo-delete-btn">삭제</button>
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
  }

  renderTodo();
};

todoForm.addEventListener('submit', handleAddTodo);
todoList.addEventListener('click', handleClick);
renderTodo();

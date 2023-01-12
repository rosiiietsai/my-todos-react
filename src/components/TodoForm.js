import icons from '../assets/sprite.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TodoForm({
  onSubmit,
  todoState,
  todosOrderState,
  fetchedTodo,
}) {
  const [todo, setTodo] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isTop, setIsTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetchedTodo) return;
    setTodo(fetchedTodo.todo);
    setPriority(fetchedTodo.priority);
    setIsTop(fetchedTodo.isTop);
  }, [fetchedTodo]);

  useEffect(() => {
    if (!todoState.isSuccess || !todosOrderState.isSuccess) return;
    navigate('/');
  }, [todoState, todosOrderState, navigate]);

  return (
    <div className="todo-form">
      <button
        className="btn btn__icon todo-form__btn--close"
        onClick={() => navigate('/')}>
        <svg className="close__icon">
          <use href={`${icons}#icon-close`}></use>
        </svg>
      </button>

      <form onSubmit={e => onSubmit(e, todo, priority, isTop)}>
        <div className="todo-form__field">
          <label>
            <input
              type="text"
              placeholder="Add a new todo..."
              value={todo}
              onChange={e => setTodo(e.target.value)}
              autoFocus
              required
            />
          </label>
        </div>
        <div className="todo-form__field input__priority">
          <span>Priority</span>
          <label>
            <input
              type="radio"
              className="hidden"
              value="high"
              onChange={e => setPriority(e.target.value)}
              checked={priority === 'high'}
            />
            <span
              className={`btn btn__priority btn__priority--high ${
                priority === 'high' && 'btn__priority--high--checked'
              }`}>
              HIGH
            </span>
          </label>
          <label>
            <input
              type="radio"
              className="hidden"
              value="medium"
              onChange={e => setPriority(e.target.value)}
              checked={priority === 'medium'}
            />
            <span
              className={`btn btn__priority btn__priority--medium ${
                priority === 'medium' && 'btn__priority--medium--checked'
              }`}>
              MEDIUM
            </span>
          </label>
          <label>
            <input
              type="radio"
              className="hidden"
              value="low"
              onChange={e => setPriority(e.target.value)}
              checked={priority === 'low'}
            />
            <span
              className={`btn btn__priority btn__priority--low ${
                priority === 'low' && 'btn__priority--low--checked'
              }`}>
              LOW
            </span>
          </label>
        </div>

        <div className="todo-form__field">
          <label className=" todo-form__field--top">
            <span>Move to the top</span>
            <div className="btn btn__icon checkbox">
              <svg>
                <use
                  href={`${icons}#${
                    isTop ? 'icon-check-square' : 'icon-square-o'
                  }`}></use>
              </svg>
            </div>
            <input
              type="checkbox"
              className="hidden"
              onChange={e => setIsTop(!isTop)}
              checked={isTop}
            />
          </label>
        </div>

        <button
          className="btn btn--large btn--dark todo-form__btn--submit"
          disabled={todoState.isPending}>
          {todoState.isPending ? 'loading...' : 'Add Todo'}
        </button>
      </form>

      {todoState.error && <div className="error">{todoState.error}</div>}
    </div>
  );
}

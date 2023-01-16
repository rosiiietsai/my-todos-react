import icons from '../assets/sprite.svg';
import { useNavigate } from 'react-router-dom';
import { useChangeTodo } from '../hooks/useChangeTodo';

export default function Todo({ todo, sortedTodos, orderBy }) {
  const navigate = useNavigate();
  const { handleComplete, handleDelete, handleMoveUp, handleMoveDown } =
    useChangeTodo();
  const tag = `todo__tag--${
    todo.isCompleted ? 'completed' : `priority-${todo.priority}`
  }`;

  return (
    <div className={`todo ${tag}`}>
      <div
        className="btn btn__icon checkbox"
        onClick={() => handleComplete(todo)}>
        <svg>
          <use
            href={`${icons}#${
              todo.isCompleted ? 'icon-check-square' : 'icon-square-o'
            }`}></use>
        </svg>
      </div>
      <p className="todo__content">{todo.todo}</p>

      <button
        className="btn btn__icon todo__btn"
        onClick={() => navigate(`/update/${todo.id}`)}>
        <svg>
          <use href={`${icons}#icon-edit`}></use>
        </svg>
      </button>

      <button
        className="btn btn__icon todo__btn"
        onClick={() => handleDelete(todo, orderBy)}>
        <svg>
          <use href={`${icons}#icon-trash-o`}></use>
        </svg>
      </button>

      {!todo.isCompleted && (
        <>
          <button
            className="btn btn__icon todo__btn"
            onClick={() => handleMoveUp(todo, sortedTodos, orderBy)}>
            <svg>
              <use href={`${icons}#icon-arrow-up-thick`}></use>
            </svg>
          </button>
          <button
            className="btn btn__icon todo__btn"
            onClick={() => handleMoveDown(todo, sortedTodos, orderBy)}>
            <svg>
              <use href={`${icons}#icon-arrow-down-thick`}></use>
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

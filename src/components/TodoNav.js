import icons from '../assets/sprite.svg';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const todoNavCategories = ['all', 'high', 'medium', 'low'];

export default function TodosNav({ category, onClick }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleClick = e => {
    if (!user) return;
    onClick(e.target.dataset.category);
  };

  return (
    <div className="todos-nav">
      <ul className="todos-nav__categories">
        {todoNavCategories.map(cat => (
          <li
            key={cat}
            className={`btn btn__category ${
              user && cat === category ? 'btn__category--active' : ''
            }`}
            data-category={cat}
            onClick={handleClick}>
            {cat.toUpperCase()}
          </li>
        ))}
      </ul>
      {user && (
        <button className="btn btn__icon" onClick={() => navigate('/create')}>
          <svg>
            <use href={`${icons}#icon-plus`}></use>
          </svg>
        </button>
      )}
    </div>
  );
}

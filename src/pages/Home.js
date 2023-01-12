import icons from '../assets/sprite.svg';

import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFetchCollection } from '../hooks/useFetchCollection';
import { useFetchDocument } from '../hooks/useFetchDocument';
import { useChangeTodo } from '../hooks/useChangeTodo';
import TodoNav from '../components/TodoNav';
import TodoList from '../components/TodoList';
import Skeleton from '../components/Skeleton';

export default function Home() {
  const [sortedTodos, setSortedTodos] = useState(null);
  const [displayedTodos, setDisplayedTodos] = useState(null);
  const [category, setCategory] = useState(null);
  const { user } = useAuthContext();
  const { document: todosOrder } = useFetchDocument('todosOrder', user?.uid);
  const { documents: todos, isPending } = useFetchCollection('todos', [
    'userId',
    '==',
    user?.uid,
  ]);
  const { handleDelete } = useChangeTodo();

  const handleClickNav = category => {
    const selectedTodos = sortedTodos.filter(todo =>
      category === 'all' ? todo : category === todo.priority
    );
    setDisplayedTodos(selectedTodos);
    setCategory(category);
  };

  const handleDeleteAllCompleted = () => {
    displayedTodos.forEach(todo => {
      if (todo.isCompleted) handleDelete(todo, todosOrder.orderBy);
    });
  };

  const renderContent = () => {
    if (!user) {
      return (
        <div className="home__msg">
          <p>Please signup or login to get started</p>
        </div>
      );
    } else if (isPending) {
      return <Skeleton times={5} />;
    } else if (displayedTodos?.length === 0) {
      return (
        <div className="home__msg">
          <p>All done</p>
          <svg>
            <use href={`${icons}#icon-smile-o`}></use>
          </svg>
        </div>
      );
    } else {
      return <TodoList todos={displayedTodos || []} />;
    }
  };

  // set displayed category to all when user logs in
  useEffect(() => {
    if (!user) return;
    setCategory('all');
  }, [user]);

  // sort todos by todosOrder and display it
  useEffect(() => {
    if (!todos) return;
    const sortedTodos = [...todos].sort(
      (a, b) =>
        todosOrder.orderBy.indexOf(a.id) - todosOrder.orderBy.indexOf(b.id)
    );
    setSortedTodos(sortedTodos);
    setDisplayedTodos(sortedTodos);
  }, [todos, todosOrder]);

  return (
    <div className="home">
      <TodoNav category={category} onClick={handleClickNav} />

      {renderContent()}

      {user && category === 'all' && displayedTodos?.length !== 0 && (
        <button
          className="btn btn--large btn--dark"
          onClick={handleDeleteAllCompleted}>
          Delete all completed
        </button>
      )}
    </div>
  );
}

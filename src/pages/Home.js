import icons from '../assets/sprite.svg';

import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFetchCollection } from '../hooks/useFetchCollection';
import { useFetchDocument } from '../hooks/useFetchDocument';
import TodoNav from '../components/TodoNav';
import TodoList from '../components/TodoList';
import Skeleton from '../components/Skeleton';
import { useFirestore } from '../hooks/useFirestore';

export default function Home() {
  const [sortedTodos, setSortedTodos] = useState(null);
  const [displayedTodos, setDisplayedTodos] = useState(null);
  const [category, setCategory] = useState(null);
  const { user } = useAuthContext();
  const { updateDocument: updateTodosOrder } = useFirestore('todosOrder');
  const { deleteDocument: deleteTodo } = useFirestore('todos');
  const { document: todosOrder } = useFetchDocument('todosOrder', user?.uid);
  const { documents: todos, isPending } = useFetchCollection('todos', [
    'userId',
    '==',
    user?.uid,
  ]);

  const handleDisplayCategory = useCallback(
    category => {
      const selectedTodos = sortedTodos.filter(todo =>
        category === 'all' ? todo : category === todo.priority
      );
      setDisplayedTodos(selectedTodos);
      setCategory(category);
    },
    [sortedTodos]
  );

  const handleDeleteAllCompleted = () => {
    // delete all completed todos in the todosOrder and update it
    const deleteTodoIds = displayedTodos
      .filter(todo => todo.isCompleted)
      .map(todo => todo.id);
    const updatedOrder = todosOrder.orderBy.filter(
      id => !deleteTodoIds.includes(id)
    );
    updateTodosOrder(user.uid, { orderBy: updatedOrder });

    // delete all completed todos
    displayedTodos.forEach(todo => {
      if (todo.isCompleted) deleteTodo(todo.id);
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

  // sort todos by todosOrder when page loads
  useEffect(() => {
    if (!todos) return;
    const sortedTodos = [...todos].sort(
      (a, b) =>
        todosOrder.orderBy.indexOf(a.id) - todosOrder.orderBy.indexOf(b.id)
    );
    setSortedTodos(sortedTodos);
  }, [todos, todosOrder]);

  // display by sorted todos for each category
  useEffect(() => {
    if (!sortedTodos) return;
    handleDisplayCategory(category);
  }, [handleDisplayCategory, category, sortedTodos]);

  return (
    <div className="home">
      <TodoNav category={category} onClick={handleDisplayCategory} />

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

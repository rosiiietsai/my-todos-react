import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFirestore } from '../hooks/useFirestore';
import { useFetchDocument } from '../hooks/useFetchDocument';
import TodoForm from '../components/TodoForm';

export default function Update() {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { document: fetchedTodo } = useFetchDocument('todos', id);
  const { document: fetchedTodosOrder } = useFetchDocument(
    'todosOrder',
    user.uid
  );
  const { addDocument: addTodo, state: todoState } = useFirestore('todos');
  const { addDocument: addTodosOrder, state: todosOrderState } =
    useFirestore('todosOrder');

  const handleSubmit = (e, todo, priority, isTop) => {
    e.preventDefault();
    if (!fetchedTodosOrder) return;

    const updatedTodosOrder = isTop
      ? { orderBy: [id, ...fetchedTodosOrder.orderBy.filter(el => el !== id)] }
      : { orderBy: fetchedTodosOrder.orderBy };

    const updatedTodo = {
      todo,
      priority,
      isTop,
      isCompleted: fetchedTodo.isCompleted,
      userId: fetchedTodo.userId,
    };

    addTodo(updatedTodo, id);
    addTodosOrder(updatedTodosOrder, fetchedTodo.userId);
  };

  return (
    <TodoForm
      onSubmit={handleSubmit}
      todoState={todoState}
      todosOrderState={todosOrderState}
      fetchedTodo={fetchedTodo}
    />
  );
}

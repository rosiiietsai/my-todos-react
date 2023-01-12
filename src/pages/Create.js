import { uuidv4 } from '@firebase/util';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFirestore } from '../hooks/useFirestore';
import { useFetchDocument } from '../hooks/useFetchDocument';
import TodoForm from '../components/TodoForm';

export default function Create() {
  const { user } = useAuthContext();
  const { addDocument: addTodo, state: todoState } = useFirestore('todos');
  const { addDocument: addTodosOrder, state: todosOrderState } =
    useFirestore('todosOrder');
  const { document: fetchedTodosOrder } = useFetchDocument(
    'todosOrder',
    user.uid
  );

  const handleSubmit = (e, todo, priority, isTop) => {
    e.preventDefault();
    const todoId = uuidv4();
    if (!fetchedTodosOrder) return;

    const newTodosOrder = isTop
      ? { orderBy: [todoId, ...fetchedTodosOrder.orderBy] }
      : { orderBy: [...fetchedTodosOrder.orderBy, todoId] };

    const newTodo = {
      todo,
      priority,
      isTop,
      isCompleted: false,
      userId: user.uid,
    };

    addTodo(newTodo, todoId);
    addTodosOrder(newTodosOrder, user.uid);
  };

  return (
    <TodoForm
      onSubmit={handleSubmit}
      todoState={todoState}
      todosOrderState={todosOrderState}
    />
  );
}

import { useAuthContext } from '../hooks/useAuthContext';
import { useFetchDocument } from '../hooks/useFetchDocument';
import Todo from './Todo';

export default function TodoList({ todos }) {
  const { user } = useAuthContext();
  const { document: fetchedTodosOrder } = useFetchDocument(
    'todosOrder',
    user.uid
  );

  return (
    <div className="todo-list">
      <div className="todo__category--priority-high">
        {todos
          .filter(todo => !todo.isCompleted && todo.priority === 'high')
          .map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              todos={todos}
              orderBy={fetchedTodosOrder?.orderBy}
            />
          ))}
      </div>

      <div className="todo__category--priority-medium">
        {todos
          .filter(todo => !todo.isCompleted && todo.priority === 'medium')
          .map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              todos={todos}
              orderBy={fetchedTodosOrder?.orderBy}
            />
          ))}
      </div>

      <div className="todo__category--priority-low">
        {todos
          .filter(todo => !todo.isCompleted && todo.priority === 'low')
          .map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              todos={todos}
              orderBy={fetchedTodosOrder?.orderBy}
            />
          ))}
      </div>

      <div className="todo__category--completed">
        {todos
          .filter(todo => todo.isCompleted)
          .map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              todos={todos}
              orderBy={fetchedTodosOrder?.orderBy}
            />
          ))}
      </div>
    </div>
  );
}

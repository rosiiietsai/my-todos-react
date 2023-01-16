import Todo from './Todo';

export default function TodoList({ selectedTodos, sortedTodos, orderBy }) {
  return (
    <div className="todo-list">
      <div className="todo__category--priority-high">
        {selectedTodos
          .filter(todo => !todo.isCompleted && todo.priority === 'high')
          .map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              sortedTodos={sortedTodos}
              orderBy={orderBy}
            />
          ))}
      </div>

      <div className="todo__category--priority-medium">
        {selectedTodos
          .filter(todo => !todo.isCompleted && todo.priority === 'medium')
          .map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              sortedTodos={sortedTodos}
              orderBy={orderBy}
            />
          ))}
      </div>

      <div className="todo__category--priority-low">
        {selectedTodos
          .filter(todo => !todo.isCompleted && todo.priority === 'low')
          .map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              sortedTodos={sortedTodos}
              orderBy={orderBy}
            />
          ))}
      </div>

      <div className="todo__category--completed">
        {selectedTodos
          .filter(todo => todo.isCompleted)
          .map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              sortedTodos={sortedTodos}
              orderBy={orderBy}
            />
          ))}
      </div>
    </div>
  );
}

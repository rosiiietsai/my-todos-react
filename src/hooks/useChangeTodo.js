import { useFirestore } from '../hooks/useFirestore';

const swapArrElements = (array, index1, index2) => {
  const arrCopy = [...array];
  [arrCopy[index1], arrCopy[index2]] = [arrCopy[index2], arrCopy[index1]];
  return arrCopy;
};

export const useChangeTodo = () => {
  const { updateDocument: updateTodosOrder } = useFirestore('todosOrder');
  const { deleteDocument: deleteTodo, updateDocument: updateTodo } =
    useFirestore('todos');

  const handleComplete = todo =>
    updateTodo(todo.id, {
      isCompleted: !todo.isCompleted,
    });

  const handleDelete = (todo, orderBy) => {
    const updatedOrder = orderBy.filter(id => id !== todo.id);
    updateTodosOrder(todo.userId, { orderBy: updatedOrder });
    deleteTodo(todo.id);
  };

  const handleMoveUp = (todo, sortedTodos, orderBy) => {
    const todoIndex = orderBy.indexOf(todo.id);

    // find the previous todo id with same category and not yet completed
    const prevTodo = sortedTodos
      .slice(0, todoIndex)
      .filter(t => t.priority === todo.priority && !t.isCompleted)
      .at(-1);
    if (!prevTodo) return;
    const prevTodoIndex = orderBy.indexOf(prevTodo.id);

    // swap the order with previous todo
    const updatedOrder = swapArrElements(orderBy, todoIndex, prevTodoIndex);
    updateTodosOrder(todo.userId, { orderBy: updatedOrder });
  };

  const handleMoveDown = (todo, sortedTodos, orderBy) => {
    const todoIndex = orderBy.indexOf(todo.id);

    // find the next todo id with same category and not yet completed
    const nextTodo = sortedTodos
      .slice(todoIndex)
      .filter(t => t.priority === todo.priority && !t.isCompleted)
      .at(1);
    if (!nextTodo) return;
    const nextTodoIndex = orderBy.indexOf(nextTodo.id);

    // swap the order with next todo
    const updatedOrder = swapArrElements(orderBy, todoIndex, nextTodoIndex);
    updateTodosOrder(todo.userId, { orderBy: updatedOrder });
  };

  return { handleComplete, handleDelete, handleMoveUp, handleMoveDown };
};

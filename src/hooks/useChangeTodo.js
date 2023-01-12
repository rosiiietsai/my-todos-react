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

  const handleDelete = (todo, order) => {
    const updatedOrder = order.filter(id => id !== todo.id);
    updateTodosOrder(todo.userId, { orderBy: updatedOrder });
    deleteTodo(todo.id);
  };

  const handleMoveUp = (todo, todos, order) => {
    const todoIndex = order.indexOf(todo.id);
    const prevTodo = todos
      .slice(0, todoIndex)
      .filter(t => t.priority === todo.priority)
      .at(-1);

    if (!prevTodo) return;
    const prevTodoIndex = order.indexOf(prevTodo.id);
    const updatedOrder = swapArrElements(order, todoIndex, prevTodoIndex);
    updateTodosOrder(todo.userId, { orderBy: updatedOrder });
  };

  const handleMoveDown = (todo, todos, order) => {
    const todoIndex = order.indexOf(todo.id);
    const nextTodo = todos
      .slice(todoIndex)
      .filter(t => t.priority === todo.priority)
      .at(1);

    if (!nextTodo) return;
    const nextTodoIndex = order.indexOf(nextTodo.id);
    const updatedOrder = swapArrElements(order, todoIndex, nextTodoIndex);
    updateTodosOrder(todo.userId, { orderBy: updatedOrder });
  };

  return { handleComplete, handleDelete, handleMoveUp, handleMoveDown };
};

import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem(todo:any) {
    const dispatch = useDispatch();
    return (
      <li key={todo.id} className="list-group-item d-flex">
        <span className="me-4">{todo.title}</span>
        <button onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click" className="btn btn-primary ms-5"> Edit </button>
        <button onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click" className="btn btn-danger ms-2"> Delete </button>
      </li>
    );
  }
  
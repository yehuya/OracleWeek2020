import {useState} from 'react';
import './App.css';

// input
// list todos
// todo

function Todo(props) {
  const {completed, id, todo, updateTodo} = props;

  const handleChange = (e) => {
    updateTodo(id, !completed);
  }

  return (
    <li>
      <input id={`id-${id}`} type="checkbox" checked={completed} onChange={handleChange}/>
      <label htmlFor={`id-${id}`}>
        {todo}
      </label>
    </li>
  )
}

function TodoList(props) {
  return (
    <ul>
      {props.list.map(todo => <Todo key={todo.id} {...todo} updateTodo={props.updateTodo}/>)}
    </ul>
  )
}

function AddTodo(props) {
  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleClick = () => {
    props.addTodo(todo);
    setTodo("");
  }

  return (
    <div>
      <input type="text" value={todo} onChange={handleChange}/>
      <button onClick={handleClick}>Add</button>
    </div>
  )
}

function App() {
  const [list, setList] = useState([]);

  const addTodo = (todo) => {
    setList([...list, {completed: false, id: list.length, todo: todo}]);
  }

  const updateTodo = (id, completed) => {
    const updated = list.map(todo => {
      if(todo.id === id) {
        return {...todo, completed: completed}
      }

      return todo;
    });

    setList(updated);
  }

  return (
    <div className="app">
      <h1>TODO App</h1>
      <AddTodo addTodo={addTodo}/>
      <TodoList list={list} updateTodo={updateTodo}/>
    </div>
  )
}

export default App;

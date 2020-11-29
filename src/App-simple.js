import {useState} from 'react';
import './App.css';

// input
// list todos
// todo

function Todo(props) {
  const {completed, id, todo, update} = props;

  const handleChange = (e) => {
    update(id, !completed);
  }

  return (
    <li>
      <input id={`id-${id}`} type="checkbox" checked={completed} onChange={handleChange}/>
      <label htmlFor={`id-${id}`} style={{textDecoration: completed ? 'line-through' : 'none'}}>
        {todo}
      </label>
    </li>
  )
}

function App(props) {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  }

  const handleSubmit = () => {
    const newTodo = {
      todo: input,
      completed: false,
      id: list.length
    }

    setList([...list, newTodo]);
    setInput("");
  }

  const updateCompleted = (id, completed) => {
    const updated = list.map(item => {
      if(item.id === id) {
        return {...item, completed: completed}
      }

      return item;
    });

    setList(updated);
  } 

  return (
    <div>
      <h1>
        TODO APP
      </h1>
      <div>
        Todo: <input type="text" value={input} onChange={handleInputChange}/>
        <button onClick={handleSubmit}>Add Todo</button>
      </div>
      <ul>
        {list.map(item => <Todo key={item.id} {...item} update={updateCompleted}/>)}
      </ul>
    </div>
  )
}


export default App;


import React, {useState} from 'react';
import TodoList from './TodoList';
import './App.css';
import { Item, State } from './interface';

const App: React.FC = () => {
  const [state, setState] = useState({ items: [], text: '' } as State);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!state.text.length) {
      return;
    }
    const newItem: Item = {
      text: state.text,
      id: Date.now()
    };
    setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ items: state.items, text: e.target.value });
  };

  return (
    <div>
      <h3>TODO</h3>
      <TodoList items={state.items} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">
          What needs to be done?
        </label>
        <input
          id="new-todo"
          onChange={handleChange}
          value={state.text}
        />
        <button>
          Add #{state.items.length + 1}
        </button>
      </form>
    </div>
  );
};

export default App;

// https://reactjs.org/
// class TodoApp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { items: [], text: '' };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//   render() {
//     return (
//       <div>
//         <h3>TODO</h3>
//         <TodoList items={this.state.items} />
//         <form onSubmit={this.handleSubmit}>
//           <label htmlFor="new-todo">
//             What needs to be done?
//           </label>
//           <input
//             id="new-todo"
//             onChange={this.handleChange}
//             value={this.state.text}
//           />
//           <button>
//             Add #{this.state.items.length + 1}
//           </button>
//         </form>
//       </div>
//     );
//   }
//
//   handleChange(e) {
//     this.setState({ text: e.target.value });
//   }
//
//   handleSubmit(e) {
//     e.preventDefault();
//     if (!this.state.text.length) {
//       return;
//     }
//     const newItem = {
//       text: this.state.text,
//       id: Date.now()
//     };
//     this.setState(state => ({
//       items: state.items.concat(newItem),
//       text: ''
//     }));
//   }
// }
//
// class TodoList extends React.Component {
//   render() {
//     return (
//       <ul>
//         {this.props.items.map(item => (
//           <li key={item.id}>{item.text}</li>
//         ))}
//       </ul>
//     );
//   }
// }
//
// ReactDOM.render(
//   <TodoApp />,
//   document.getElementById('todos-example')
// );

import React from 'react';
import { Item } from './interface';

const TodoList = React.memo((props: { items: Array<Item> }) => {
  return (
    <ul>
      {props.items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
});
export default TodoList;

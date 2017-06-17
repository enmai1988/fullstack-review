import React from 'react';
import ListEntry from './ListEntry.jsx';

const List = (props) => (
  <ul className="list">
    {props.list.map((entry, i) => <ListEntry repo={entry} key={i}/>)}
  </ul>
);

export default List;

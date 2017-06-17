import React from 'react';

const ListEntry = (props) => (
  <li>
    <a href={props.repo.html_url}>{props.repo.name}</a>
  </li>
);

export default ListEntry;

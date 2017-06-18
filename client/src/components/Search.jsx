import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.input = '';
  }

  onChange(e) {
    this.input = e.target.value;
    this.props.onChange(this.input);
  }

  search() {
    this.props.onSearch(this.input);
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input onChange={this.onChange.bind(this)}/>
      <button onClick={this.search.bind(this)}> Add Repos </button>
    </div>)
  }
}

export default Search;

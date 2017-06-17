import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange(e) {
    this.props.onChange(e.target.value);
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

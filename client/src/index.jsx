import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.currList = {}; // holds different states of repo list
    this.state = {
      repos: []
    }
  }

  // initialize app with data
  componentDidMount() {
    // send a get request to server for top 25 repos as initial value
    $.ajax({
      url: 'http://127.0.0.1:1128/repos',
      method: 'GET',
      success: (data) => {
        this.setState({ repos: JSON.parse(data) });
        this.currList[''] = JSON.parse(data);
      },
      error: () => {
        console.log('Failed');
      }
    })
  }

  onChange(input) {
    // filter the repos array to find matching result
    let keywords = input.toLowerCase();

    let result = this.state.repos.filter(repo => {
      return repo.name.toLowerCase().includes(keywords);
    });

    if (!this.currList[input]) {
      this.currList[input] = result;
    }

    this.setState({ repos: this.currList[input] });
  }

  onSearch (term) {
    console.log(`${term} was searched`);
    // should send a post request to the server
    $.ajax({
      url: 'http://127.0.0.1:1128/repos/import',
      method: 'POST',
      data: {query: term},
      success: (response) => {
        // upon receiving the repos, change the state of current repos
        let repos = JSON.parse(response);
        this.setState({ repos: repos });
      },
      error: () => {
        console.log('Failed');
      }
    });
  }

  render () {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos}/>
        <Search onSearch={this.onSearch.bind(this)} onChange={this.onChange.bind(this)}/>
        <List list={this.state.repos} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

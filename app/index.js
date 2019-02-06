const React = require('react');
const ReactDOM = require('react-dom');
require('./app.css');
class App extends React.Component {
  render() {
    return <div>Hello WOrld</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

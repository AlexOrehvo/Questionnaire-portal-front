import React, {Component} from 'react';
import './App.scss';

import AppRouting from "./../routing/AppRouting";

class App extends Component {

  render() {
      return (
          <div className="container-fluid app-container">
              <AppRouting />
          </div>
      )
  }

}

export default App;

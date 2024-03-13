import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

// Define the interface for the component state
interface IState {
  data: ServerRespond[];
  showGraph : boolean,
}

// Define the App component
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    // Initialize the state
    this.state = {
      data: [],
      showGraph : false,
    };
  }

  // Define a method to start streaming data
  getDataFromServer() {
    let x = 0;
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({
          data: serverResponds,
          showGrapgh: true,
        });
      });
      x++;
      if (x > 1000) {
        clearInterval(interval);
      }
    }, 100);
  }

  // Define a method to render the graph
  renderGraph() {
    if (this.state.showGraph) {
      return (<Graph data={this.state.data} />);
    }
  }

  // Render the App component
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            onClick={() => { this.startStreamingData(); }}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    );
  }
}

// Export the App component as default
export default App;

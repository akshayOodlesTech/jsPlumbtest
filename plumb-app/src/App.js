// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css';
import 'jsplumb';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }
  componentDidMount() {
    jsPlumb.ready(function () {
      var els = document.querySelectorAll(".wrapper");

      var common = {
        isSource: true,
        isTarget: true,
        connector: "Straight",
        endpoint: "Rectangle",
        paintStyle: { fill: "white", outlineStroke: "blue", strokeWidth: 3 },
        hoverPaintStyle: { outlineStroke: "lightblue" },
        connectorStyle: { outlineStroke: "green", strokeWidth: 1 },
        connectorHoverStyle: { strokeWidth: 2 },
      };
       jsPlumb.draggable("item_left");
      jsPlumb.addEndpoint("item_left", {
        anchors: ["Right"]
      }, common);
      jsPlumb.addEndpoint("item_right", {
        anchors: ["Right"]
      }, common);
      //jsPlumb.draggable(els);
    });
  }

  render() {
    return (
      <div id="diagramContainer">
          <div id="item_left" className="item"></div>
          <div id="item_right" className="item" style={{ marginLeft: "50px" }}></div>
        
      </div>
    );
  }
}

export default App;
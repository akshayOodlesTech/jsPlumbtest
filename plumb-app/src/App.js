// import React from 'react';
// import Routes from './views/App';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';

// const App = () => <Router><Routes/></Router> 

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
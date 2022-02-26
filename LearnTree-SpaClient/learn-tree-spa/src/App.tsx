import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import G6, { Graph } from '@antv/g6';
import './App.css';

function App() {

  const data = {
    nodes: [
      {
        id: 'node1',
        x: 250,
        y: 150
      },
      {
        id: 'node2',
        x: 300,
        y: 180
      }
    ],
    edges: [
      {
        source: 'node1',
        target: 'node2'
      }
    ]
  };

  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let graph: Graph | null = null;
    if (!graph) {
      graph = (new G6.Graph({
        container: ReactDOM.findDOMNode(ref.current) as HTMLElement,
        width: 1200,
        height: 800,
        modes: {
          default: ['drag-canvas', 'drag-node', 'zoom-canvas']
        },
        defaultEdge: {
          type: 'cubic-vertical'
        }
      }))
    }

    graph.data(data); // data here
    graph.render();
    (ReactDOM.findDOMNode(ref.current)?.childNodes.item(0) as HTMLElement).classList.add('border');
  });

  return (
    <div ref={ref}></div>
  );
}

export default App;

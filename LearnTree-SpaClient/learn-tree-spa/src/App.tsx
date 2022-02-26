import React, {MouseEvent, useEffect, useState} from 'react';
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
  let graph: Graph | null = null;

  useEffect(() => {
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

    // manual reconciliation
    const refChildCount = ReactDOM.findDOMNode(ref.current)?.childNodes.length;
    (ReactDOM.findDOMNode(ref.current)?.childNodes.item(refChildCount! - 1) as HTMLElement).classList.add('border');
    if (refChildCount! > 1) {
      ReactDOM.findDOMNode(ref.current)?.removeChild(ReactDOM.findDOMNode(ref.current)?.childNodes.item(refChildCount! - 2) as Node);
    }
  });

  function clicked(event: MouseEvent) {
    console.log(event);

    data.nodes.push({
      id: `node${data.nodes.length+1}`,
      x: event.clientX,
      y: event.clientY
    })

    data.edges.push({
      source:`node${data.nodes.length - 1}`,
      target: `node${data.nodes.length}`
    })
    
    graph?.data(data);
    graph?.render();
  }

  return (
    <>
      <div className='outerBorder' onClick={clicked} ref={ref}></div>
    </>
  );
}

export default App;

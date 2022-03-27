import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import G6, { Graph } from '@antv/g6';
import './App.css';

function App() {

  G6.registerNode('custom-rect',
  {
    options: {
      style: {
        radius: 2,
        width: 100,
        height: 25,
        stroke: '#3580db'
      },
      anchorPoints: [
        [0, 1],
        [0.5, 1]
      ],
    }
  }, 'rect')

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
      },
      {
        id: 'node3',
        x: 400,
        y: 250
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
          default: ['drag-canvas', 'zoom-canvas', {
            type: 'create-edge',
            trigger: 'drag',
            edgeConfig: {
              type: 'cubic-vertical',
              style: {
                stroke: '#f00',
                lineWidth: 2,
                // ... // other edge style configurations
              }}
          },
          {
            type: 'drag-node',
            shouldBegin: e => {
              console.log(e);
              return true;
            }
          }
        ]
        },
        defaultNode: {
          type: 'rect',
        },
        defaultEdge: {
          type: 'cubic-vertical'
        }
      }))
    }

    console.log('Use effect called')

    graph.data(data); // data here
    graph.render();

    // manual reconciliation
    const refChildCount = ReactDOM.findDOMNode(ref.current)?.childNodes.length;
    (ReactDOM.findDOMNode(ref.current)?.childNodes.item(refChildCount! - 1) as HTMLElement).classList.add('border');
    if (refChildCount! > 1) {
      ReactDOM.findDOMNode(ref.current)?.removeChild(ReactDOM.findDOMNode(ref.current)?.childNodes.item(refChildCount! - 2) as Node);
    }
  });

  return (
    <>
      <div className='outerBorder' ref={ref}></div>
    </>
  );
}

export default App;

import * as React from 'react';
import './style.scss';
import {
  // BarChart,
  // ClassGraph,
  BubbleChart
} from './charts';

export default class App extends React.Component {
  data = {
    nodes: [
      {"id": "depth-0-0", "depth": 0},
      {"id": "depth-1-0", "depth": 1},
      {"id": "depth-1-1", "depth": 1},
      {"id": "depth-1-2", "depth": 1},
      {"id": "depth-2-0", "depth": 2},
      {"id": "depth-2-1", "depth": 2},
      {"id": "depth-3-0", "depth": 3},
      {"id": "depth-3-1", "depth": 3},
      {"id": "depth-3-2", "depth": 3},
      {"id": "depth-4-0", "depth": 4},
      {"id": "depth-4-1", "depth": 4},
      {"id": "depth-5-0", "depth": 5},
      {"id": "depth-5-1", "depth": 5},
      {"id": "depth-6-0", "depth": 6},
      {"id": "depth-6-1", "depth": 6},
    ],
    links: [
      {"source": "depth-0-0", "target": "depth-1-0", "value": 1},
      {"source": "depth-0-0", "target": "depth-1-1", "value": 1},
      {"source": "depth-0-0", "target": "depth-1-2", "value": 1},
      {"source": "depth-1-2", "target": "depth-2-0", "value": 1},
      {"source": "depth-1-2", "target": "depth-2-1", "value": 1},
      {"source": "depth-2-0", "target": "depth-3-0", "value": 1},
      {"source": "depth-2-0", "target": "depth-3-1", "value": 1},
      {"source": "depth-2-0", "target": "depth-3-2", "value": 1},
      {"source": "depth-1-2", "target": "depth-1-0", "value": 1},
      {"source": "depth-3-1", "target": "depth-4-0", "value": 1},
      {"source": "depth-3-1", "target": "depth-4-1", "value": 1},
      {"source": "depth-4-0", "target": "depth-5-0", "value": 1},
      {"source": "depth-4-0", "target": "depth-5-1", "value": 1},
      {"source": "depth-5-0", "target": "depth-6-0", "value": 1},
      {"source": "depth-5-0", "target": "depth-6-1", "value": 1},
    ]
  };
  render() {
    return (
      <div>
        {/*<ClassGraph data={this.data} width={800} height={400} r={10} />*/}
        {/*<BarChart />*/}
        <BubbleChart />
      </div>
    );
  }
}

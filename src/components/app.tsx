import * as React from 'react';
import './style.scss';
import { BarChart, ClassGraph } from './charts';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <ClassGraph />
        <BarChart />
      </div>
    );
  }
}

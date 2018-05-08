import * as React from 'react';
import './style.scss';
import { BarChart } from './charts';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <BarChart />
      </div>
    );
  }
}

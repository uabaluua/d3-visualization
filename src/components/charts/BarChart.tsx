import * as React from 'react';
import * as d3 from 'd3';

class BarChart extends React.Component {
  private element;
  private svg;
  private data = [{
    name: 'test1',
    value: 420
  }, {
    name: 'test2',
    value: 200
  },{
    name: 'test3',
    value: 330
  },{
    name: 'test4',
    value: 120
  },{
    name: 'test5',
    value: 50
  }];
  componentDidMount() {
    const margin = {top: 20, right: 10, bottom: 40, left: 70};
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;
    this.svg = d3.select(this.element)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    const g = this.svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const names = this.data.map(item => item.name);
    const max = d3.max(this.data, (d: any) => +d.value) || 440;
    const x = d3.scaleBand()
      .domain(names)
      .range([0, width])
      .paddingInner(0.3)
      .paddingOuter(0.3);

    const y = d3.scaleLinear()
      .domain([0, max])
      .range([height, 0]);

    const xAxis = d3.axisBottom(x);
    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(y).ticks(3).tickFormat((d: any) => `${d} m`);
    g.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    const rects = g.selectAll('rect').data(this.data);

    rects.enter()
      .append('rect')
      .attr('x', (d: any, i: any) => x(d.name))
      .attr('y', (d: any) => y(d.value))
      .attr('width', x.bandwidth)
      .attr('height', (d: any) => height - y(+d.value))
      .attr('fill', 'blue');

    g.append('text')
      .attr('class', 'x axis-label')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .text('The x title');

    g.append('text')
      .attr('class', 'y axis-label')
      .attr('x', - (height / 2))
      .attr('y', - margin.left + 20)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('The y title');
  }
  componentWillUnmount() {
    this.svg = undefined;
  }
  render() {
    return <svg ref={(ref) => (this.element = ref)} />
  }
}

export default BarChart;

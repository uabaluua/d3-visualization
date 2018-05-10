import * as React from 'react';
import * as d3 from 'd3';

class BarChart extends React.Component {
  private element;
  private svg;
  private x;
  private y;
  private g;
  private xAxisGroup;
  private yAxisGroup;
  private width;
  private height;
  private flag = false;
  private data = [
    {
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
    this.init();
  }
  componentWillUnmount() {
    this.svg = undefined;
  }
  init() {
    const margin = {top: 20, right: 10, bottom: 40, left: 70};
    this.width = 400 - margin.left - margin.right;
    this.height = 200 - margin.top - margin.bottom;
    this.svg = d3.select(this.element)
      .attr('width', this.width + margin.left + margin.right)
      .attr('height', this.height + margin.top + margin.bottom)
    this.g = this.svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    this.x = d3.scaleBand()
      .range([0, this.width])
      .paddingInner(0.3)
      .paddingOuter(0.3);

    this.y = d3.scaleLinear()
      .range([this.height, 0]);

    this.xAxisGroup = this.g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${this.height})`);

    this.yAxisGroup = this.g.append('g')
      .attr('class', 'y-axis');

    this.update(this.data);

    this.g.append('text')
      .attr('class', 'x axis-label')
      .attr('x', this.width / 2)
      .attr('y', this.height + margin.bottom)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .text('The x title');

    this.g.append('text')
      .attr('class', 'y axis-label')
      .attr('x', - (this.height / 2))
      .attr('y', - margin.left + 20)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('The y title');

    d3.interval(() => {
      this.update(this.flag ? this.data : this.data.slice(1))
      this.flag = !this.flag;
    }, 1000);
  }

  update(data) {
    const max = d3.max(data, (d: any) => +d.value) || 440;
    this.x.domain(data.map(item => item.name));
    this.y.domain([0, max]);
    const t = d3.transition().duration(750);

    const xAxis = d3.axisBottom(this.x);
    this.xAxisGroup.transition(t).call(xAxis);

    const yAxis = d3.axisLeft(this.y).ticks(3).tickFormat((d: any) => `${d} m`);
    this.yAxisGroup.transition(t).call(yAxis);

    const rects = this.g.selectAll('rect').data(data, (d) => d.name);

    rects.exit().attr('fill', 'red')
      .transition(t).attr('y', this.y(0))
      .attr('height', 0).remove();

    rects.enter()
      .append('rect')
      .attr('x', (d: any, i: any) => this.x(d.name))
      .attr('width', this.x.bandwidth)
      .attr('fill', 'blue')
      .attr('y', (d: any) => this.y(0))
      .attr('fill-opacity', 0)
      .attr('height', 0)
      .merge(rects)
      .transition(t)
      .attr('x', (d: any, i: any) => this.x(d.name))
      .attr('y', (d: any) => this.y(d.value))
      .attr('width', this.x.bandwidth)
      .attr('height', (d: any) => this.height - this.y(+d.value))
      .attr('fill-opacity', 1);
  }

  render() {
    return <svg ref={(ref) => (this.element = ref)} />
  }
}

export default BarChart;

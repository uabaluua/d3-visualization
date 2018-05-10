import * as React from 'react';
import * as d3 from 'd3';
import dataChart from './data';

class BubbleChart extends React.Component {
  private element;
  private svg;
  private x;
  private y;
  private g;
  private r;
  private xAxisGroup;
  private yAxisGroup;
  private width;
  private height;
  private flag = 0;
  componentDidMount() {
    this.init();
  }
  componentWillUnmount() {
    this.svg = undefined;
  }
  init() {
    const margin = {top: 20, right: 10, bottom: 40, left: 70};
    this.width = 800 - margin.left - margin.right;
    this.height = 400 - margin.top - margin.bottom;
    this.svg = d3.select(this.element)
      .attr('width', this.width + margin.left + margin.right)
      .attr('height', this.height + margin.top + margin.bottom);
    this.g = this.svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    this.x = d3.scaleLog().domain([142, 150000])
      .range([0, this.width]).base(10);

    this.y = d3.scaleLinear()
      .range([this.height, 0]).domain([0, 90]);

    this.r = d3.scaleLinear()
      .range([25*Math.PI, 1500*Math.PI])
      .domain([2000, 1400000000]);

    this.xAxisGroup = this.g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${this.height})`);

    this.yAxisGroup = this.g.append('g')
      .attr('class', 'y-axis');

    this.g.append('text')
      .attr('class', 'x axis-label')
      .attr('x', this.width / 2)
      .attr('y', this.height + margin.bottom)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .text('GDP Per Capita ($)');

    this.g.append('text')
      .attr('class', 'y axis-label')
      .attr('x', - (this.height / 2))
      .attr('y', - margin.left + 20)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('Life Expectancy (Years)');

    this.update(dataChart[0]);

    d3.interval(() => {
      this.flag = (this.flag >= dataChart.length - 1) ? 0 : this.flag + 1;
      this.update(dataChart[this.flag]);
    }, 1000);
  }

  update(data) {
    const { countries } = data;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const countriesFiltered = countries.filter(item => item.income && item.life_exp && !isNaN(item.population));
    const t = d3.transition().duration(750);

    const xAxis = d3.axisBottom(this.x)
      .tickValues([400, 4000, 40000])
      .tickFormat((n: any) => `${n}$`);
    this.xAxisGroup.transition(t).call(xAxis);

    const yAxis = d3.axisLeft(this.y).ticks(8).tickFormat((d: any) => `${d}`);
    this.yAxisGroup.transition(t).call(yAxis);

    const circles = this.g.selectAll('circle').data(countriesFiltered, (d) => d.country);

    circles.exit()
      .transition(t).attr('cy', this.y(0)).remove();

    circles.enter()
      .append('circle')
      .attr('cx', (d: any, i: any) => this.x(d.income))
      .attr('fill', (d: any) => color(d.continent))
      .attr('cy', (d: any) => this.y(0))
      .attr('fill-opacity', 0)
      .attr('r', (d: any) => Math.sqrt(this.r(d.population) / Math.PI))
      .merge(circles)
      .transition(t)
      .attr('cx', (d: any, i: any) => this.x(d.income))
      .attr('cy', (d: any) => this.y(d.life_exp))
      .attr('fill-opacity', 1);
  }

  render() {
    return <svg ref={(ref) => (this.element = ref)} />
  }
}

export default BubbleChart;

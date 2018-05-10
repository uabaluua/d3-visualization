import * as React from 'react';
import * as d3 from 'd3';
import { INode, IClassGraph, ILink } from './interfaces';

class ClassGraph extends React.Component<IClassGraph> {
  private element;
  private svg;
  private simulation;

  componentDidMount() {
    this.generateChart();
  }

  componentWillUnmount() {
    this.element = undefined;
  }

  generateChart() {
    const { data, width, height, r } = this.props;
    this.svg = d3.select(this.element);
    this.svg.attr("width", width).attr("height", height);
    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d: any) => d.id))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const links = this.svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(data.links)
      .enter().append("line")
      .attr("stroke-width", (d: ILink) => Math.sqrt(d.value));

    const nodes = this.svg.append("g")
      .attr("class", "nodes").selectAll("g").data(data.nodes)
    .enter().append('g').attr("class", (d: INode) => `node depth-${d.depth}`);

    const circles = nodes.append("circle")
      .attr("r", r)
      .attr("fill", (d: INode) => color(`${d.depth}`))
      .call(d3.drag()
        .on("start", this.dragstarted)
        .on("drag", this.dragged)
        .on("end", this.dragended));

    circles.append("title")
      .text((d: INode) => d.id);

    const labels = nodes.append('text')
      .attr('class', 'label')
      .text((d: INode) => d.id);

    this.simulation
      .nodes(data.nodes)
      .on("tick", () => this.ticked(links, circles, labels));

    (this.simulation.force("link") as any)
      .links(data.links);
  }

  bindElement = (ref) => { if (ref) this.element = ref; };

  dragstarted = (d) => {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  };

  dragged = (d) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  };

  dragended = (d) => {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  };

  ticked = (links, circles, labels) => {
    links
      .attr("x1", (d: any) => d.source.x)
      .attr("y1", (d: any) => d.source.y)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y);

    circles
      .attr("cx", (d: any) => d.x)
      .attr("cy", (d: any) => d.y);

    labels
      .attr("x", (d: any) => (d.x))
      .attr("y", (d: any) => (d.y + this.props.r * 2));
  };

  render() {
    return <svg ref={this.bindElement} />;
  }
}

export default ClassGraph;
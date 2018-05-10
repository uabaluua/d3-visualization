import * as React from 'react';
import * as d3 from 'd3';

class ClassGraph extends React.Component {
  private element;
  private svg;
  private data = {
    nodes: [
      {"id": "Event", "group": 0},
      {"id": "City", "group": 1},
      {"id": "Venue", "group": 1},
      {"id": "Duration", "group": 1},
      {"id": "DurationShape", "group": 2},
    ],
    links: [
      {"source": "Event", "target": "City", "value": 1},
      {"source": "Event", "target": "Venue", "value": 1},
      {"source": "City", "target": "Venue", "value": 1},
      {"source": "Event", "target": "Duration", "value": 1},
      {"source": "DurationShape", "target": "Duration", "value": 1},
    ]
  };

  componentDidMount() {
    this.svg = d3.select(this.element);
    const width = +this.svg.attr("width");
    const height = +this.svg.attr("height");

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d: any) => d.id))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = this.svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(this.data.links)
      .enter().append("line")
      .attr("stroke-width", (d: any) => Math.sqrt(d.value));

    const node = this.svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(this.data.nodes)
      .enter().append("circle")
      .attr("r", 5)
      .attr("fill", (d: any) => color(d.group))
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("title")
      .text((d: any) => d.id);

    function ticked() {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    simulation
      .nodes(this.data.nodes)
      .on("tick", ticked);

    (simulation.force("link") as any)
      .links(this.data.links);
  }

  componentWillUnmount() {
    this.element = undefined;
  }

  bindElement = (ref) => {
    if (ref) {
      this.element = ref;
    }
  };

  render() {
    return <svg ref={this.bindElement} width="960" height="600" />;
  }
}

export default ClassGraph;
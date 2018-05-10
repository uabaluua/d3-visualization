import * as React from 'react';
import * as d3 from 'd3';

class ClassGraph extends React.Component {
  private element;
  private svg;
  private data = {
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

    const nodes = this.svg.append("g")
      .attr("class", "nodes").selectAll("g")
      .data(this.data.nodes)
      .enter();

    const circles = nodes.append("circle")
      .attr("r", 10)
      .attr("fill", (d: any) => color(d.depth))
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    circles.append("title")
      .text((d: any) => d.id);

    const text = nodes.append('text')
      .attr('class', 'label')
      .attr('font-size', '10px')
      .attr('text-anchor', 'middle')
      .text((d: any) => d.id);

    function ticked() {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      circles
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      text
        .attr("x", (d: any) => (d.x))
        .attr("y", (d: any) => (d.y + 20));
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
export interface INode {
  id: string,
  depth: number
}

export interface ILink {
  source: string,
  target: string,
  value: number
}

export interface IData {
  nodes: INode[],
  links: ILink[]
}

export interface IClassGraph {
  data: IData,
  width: number,
  height: number,
  r: number
}
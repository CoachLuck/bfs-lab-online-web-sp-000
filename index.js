function bfs(rootNode, vert, edges) {
  rootNode.distance = 0

  let queue = [rootNode]
  let order = [rootNode]

  while (queue.length > 0) {
      let node = queue.shift()
      let adjacent = findAdjacent(node.name, vert, edges)
      order = order.concat(adjacent)
      markDistanceAndPredecessor(node, adjacent)
      queue = queue.concat(adjacent)
  }

  return order
}

function findAdjacent(street, vert, edges) {
  return edges
          .filter(edge => edge.includes(street))
          .map(edge => edge.filter(node => node != street)[0])
          .map(name => findNode(name, vert))
          .filter(node => node.distance == null)
}

function markDistanceAndPredecessor(pre, adjacents) {
  adjacents.map(node => {
    node.distance = pre.distance + 1
    node.predecessor = pre
  })
}

function findNode(street, vertices) {
  return vertices.find(vert => vert.name == street)
}

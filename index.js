function bfs(rootNode, vert, edges) {
  // Set the root distance to 0
  rootNode.distance = 0

  // initialize our queue and order of search
  let queue = [rootNode]
  let order = [rootNode]

  // Begin the search
  while (queue.length > 0) {
      let node = queue.shift()
      let adjacent = findAdjacent(node.name, vert, edges)

      // add found to our final list in the order we get them
      order = order.concat(adjacent)

      // mark where we have been
      markDistanceAndPredecessor(node, adjacent)

      // add to queue
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

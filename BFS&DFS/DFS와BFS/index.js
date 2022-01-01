const [condition, ...links] = require('fs').readFileSync('BFS&DFS/DFS와BFS/input.txt').toString().trim().split('\n');

// v : 정점의 개수
// e : 간선의 개수
// start : 탐색을 시작할 정점의 번호
const [v, e, start] = condition.split(' ').map(value => parseInt(value, 10));
const graph = Array.from(Array(v + 1), () => []);

links.forEach(link => {
  const [start, end] = link.split(' ').map(l => parseInt(l, 10));
  graph[start].push(end);
  graph[end].push(start);
});

// 정점이 작은것 부터 탐색해야 하기 때문에 오름차순으로 정렬해야 한다
graph.forEach(g => {
  g.sort((a, b) => a - b);
});

// DFS
const dfsVisited = [];
const DFS = (graph, start, visited) => {
  visited.push(start);

  for (const now of graph[start]) {
    if (!visited.includes(now)) {
      DFS(graph, now, visited);
    }
  }
};

// BFS
const bfsVisited = [];
const BFS = (graph, start, visited) => {
  const q = [];
  q.push(start);
  visited.push(start);

  while (q.length) {
    const now = q.shift();

    for (const g of graph[now]) {
      if (!visited.includes(g)) {
        q.push(g);
        visited.push(g);
      }
    }
  }
};

DFS(graph, start, dfsVisited);
BFS(graph, start, bfsVisited);

console.log(dfsVisited.join(' '));
console.log(bfsVisited.join(' '));

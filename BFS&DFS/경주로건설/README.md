# 문제

[https://programmers.co.kr/learn/courses/30/lessons/67259](https://programmers.co.kr/learn/courses/30/lessons/67259)

<br/>
<br/>


## 성공한 풀이 (DFS)

```js
function solution(board) {
  const n = board.length;

  // 이렇게 각각 두개로 나누지 않는 방법을 찾아보자!
  // 오른쪽 먼저 탐색하는 방향 배열
  const rightDirections = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  // 아래쪽 먼저 탐색하는 방향 배열
  const downDirections = [
    [1, 0],
    [0, 1],
    [0, -1],
    [-1, 0],
  ];

  // 코너 여부 체크 - 현재 방향과 다음 방향이 다를 경우 코너
  const isCorner = (nowDir, nextDir) => {
    return nowDir !== null && nowDir !== nextDir;
  };

  // 건설 가능 여부 체크 - 영역을 벗어나거나 벽일 경우 도로를 건설하지 못한다
  const isNotBuild = (nx, ny) => {
    return nx < 0 || ny < 0 || nx >= n || ny >= n || board[nx][ny] === 1;
  };

  // 다음오르 탐색할 칸이 이미 한 번 탐색 되었고 지금 sumCost 금액이 더 비쌀 경우
  const isExpensive = (nx, ny, sumCost) => {
    return board[nx][ny] !== 0 && sumCost > board[nx][ny];
  };

  const dfs = (x, y, cost, nowDir, directions) => {
    directions.forEach(([dx, dy], nextDir) => {
      const [nx, ny] = [x + dx, y + dy];

      if (isNotBuild(nx, ny)) {
        return;
      }

      const nextCost = isCorner(nowDir, nextDir) ? 600 : 100;

      if (isExpensive(nx, ny, cost + nextCost)) {
        return;
      }

      board[nx][ny] = cost + nextCost;

      dfs(nx, ny, cost + nextCost, nextDir, directions);
    });
  };

  // 맨 처음 시작 칸은 다시 탐색되면 안되므로 -1
  board[0][0] = -1;

  dfs(0, 0, 0, null, rightDirections);
  dfs(0, 0, 0, null, downDirections);

  return board[n - 1][n - 1];
}
```



<br/>
<br/>

## 실패한 풀이 (BFS)

25번 테스트 케이스 실패!

```js
function solution(board) {
  const n = board.length;

  const isNotBuild = (x, y, board) => {
    if (0 > x || 0 > y || x >= n || y >= n || board[x][y] === 1) {
      return true;
    }

    return false;
  };

  const isReverseDirection = (nowDir, nextDir) => {
    return nowDir !== null && Math.abs(nextDir - nowDir) === 2;
  };

  const bfs = board => {
    // x, y, cost, 현재 방향
    const q = [[0, 0, 0, null]];
    // 우(0) -> 하(1) -> 좌(2) -> 상(3)
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    while (q.length) {
      const [x, y, cost, nowDir] = q.shift();

      // 현재 board가 cost 보다 작으면 더 볼 필요가 없으므로 continue
      // 하지만 0보다는 커야함 그 이유는 0일경우 아직 도로를 짓지 않았기 때문
      if (board[x][y] < cost && board[x][y] > 0) {
        continue;
      }

      board[x][y] = cost;

      directions.forEach(([dx, dy], dirIndex) => {
        const nowX = x + dx;
        const nowY = y + dy;

        // 두 값의 차이가 2일 경우 좌 <-> 우 / 상 <-> 하 이기 때문에 패스 한다.
        // 그 이유는 시작점이 0,0 이고 도착점이 n-1, n-1이 보장되어 있기 때문에 다시 역주행 할 필요가 없다
        // 도로를 지을 수 없을 경우에도 패스 한다.
        if (
          isReverseDirection(nowDir, dirIndex) ||
          isNotBuild(nowX, nowY, board)
        ) {
          return;
        }

        q.push([
          nowX,
          nowY,
          nowDir !== null && nowDir !== dirIndex ? cost + 600 : cost + 100,
          dirIndex,
        ]);
      });
    }
  };

  bfs(board);

  return board[n - 1][n - 1];
}
```


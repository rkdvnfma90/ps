# 문제

[https://programmers.co.kr/learn/courses/30/lessons/67259](https://programmers.co.kr/learn/courses/30/lessons/67259)

<br/>
<br/>

## 풀이

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

<br/>
<br/>

## 

테스트 케이스 25번을 통과하지 못함 😭

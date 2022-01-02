// DFS
function solution(board) {
  const n = board.length;

  const rightDirections = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const downDirections = [
    [1, 0],
    [0, 1],
    [0, -1],
    [-1, 0],
  ];

  const isCorner = (nowDir, nextDir) => {
    return nowDir !== null && nowDir !== nextDir;
  };

  const isNotBuild = (nx, ny) => {
    return nx < 0 || ny < 0 || nx >= n || ny >= n || board[nx][ny] === 1;
  };

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

  board[0][0] = -1;

  dfs(0, 0, 0, null, rightDirections);
  dfs(0, 0, 0, null, downDirections);

  return board[n - 1][n - 1];
}


/* BFS - 25번 테스트 케이스 실패
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
    const q = [[0, 0, 0, null]];
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    while (q.length) {
      const [x, y, cost, nowDir] = q.shift();

      if (board[x][y] < cost && board[x][y] > 0) {
        continue;
      }

      board[x][y] = cost;

      directions.forEach(([dx, dy], dirIndex) => {
        const nowX = x + dx;
        const nowY = y + dy;

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
*/
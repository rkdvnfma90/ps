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

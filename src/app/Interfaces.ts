export interface User {
  name: string;
  email: string;
}

export const Commands = {
  start: 'actionStart',
  pause: 'actionStop',
  reset: 'actionReset',
  left: 'actionLeft',
  right: 'actionRight',
  down: 'actionDown',
  rotate: 'actionRotate',
};

enum GameStatus {
  started = 'Started',
  paused = 'Paused',
  gameOver = 'GAME OVER',
}

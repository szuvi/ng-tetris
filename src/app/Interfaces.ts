export interface User {
  name: string;
  email: string;
}

// export const Commands = {
//   start: 'actionStart',
//   pause: 'actionStop',
//   reset: 'actionReset',
//   left: 'actionLeft',
//   right: 'actionRight',
//   down: 'actionDown',
//   rotate: 'actionRotate',
// };

export enum GameState {
  started = 'Started',
  paused = 'Paused',
  gameOver = 'GAME OVER',
  point = 'Line cleared',
}

export enum Command {
  start = 'actionStart',
  pause = 'actionStop',
  reset = 'actionReset',
  left = 'actionLeft',
  right = 'actionRight',
  down = 'actionDown',
  rotate = 'actionRotate',
}

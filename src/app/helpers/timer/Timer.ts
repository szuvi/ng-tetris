export default class Timer {
  private time: number;
  private timeStart: number;
  private timePause: number;
  private paused: boolean;

  constructor() {
    this.time = 0;
    this.paused = true;
  }

  public start(): void {
    this.paused = false;
    this.timeStart = Date.now().valueOf();
  }
  public pause(): void {
    if (!this.paused) {
      this.paused = true;
      this.timePause = Date.now().valueOf();
      this.time += this.timePause - this.timeStart;
    }
  }
  public getTime(): number {
    const now = Date.now().valueOf();
    const timeComp = this.paused ? now : this.timeStart;
    return Date.now().valueOf() - timeComp + this.time;
  }
}

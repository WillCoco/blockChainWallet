/**
 * @author: Xu Ke
 * @date: 2019/9/10 12:51 PM
 * @Description: 轮询器, 可停止和启动
 */
const DEFAULT_POLL_INTERVAL = 3000;

class Poll {
  frameId;

  lastTime;

  interval;

  callback;

  isPolling;

  initExec; // init时是先执行一次callback

  constructor({
    interval = DEFAULT_POLL_INTERVAL,
    callback = () => undefined,
    initExec = true,
  }) {
    this.interval = interval;
    this.callback = callback;
    this.initExec = initExec;
  }

  start = () => {
    if (this.isPolling) {
      return;
    }

    this.lastTime = Date.now();
    this.polling();
    this.isPolling = true;
    if (this.initExec) {
      this.callback();
    }
  };

  stop = () => {
    if (!this.isPolling) {
      return;
    }
    cancelAnimationFrame(this.frameId);
    this.isPolling = false;
  };

  polling() {
    this.frameId = requestAnimationFrame(() => {
      const currentTime = Date.now();
      if (currentTime > this.lastTime + this.interval) {
        this.lastTime = currentTime;
        this.callback();
      }
      this.polling();
    });
  }

  getPollingStatus() {
    return this.isPolling;
  }
}

export default Poll;

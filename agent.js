'use strict';

const createEurekaClient = require('./lib/eureka');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configDidLoad() {
    this.eurekaClient = createEurekaClient(this.app);
  }

  async beforeClose() {
    await new Promise(resolve => {
      this.eurekaClient.stop(resolve);
    });
  }
}

module.exports = AppBootHook;

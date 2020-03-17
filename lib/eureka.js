'use strict';

const { Eureka } = require('eureka-js-client');
const { Deferred } = require("./util");

module.exports = app => {
  let eggReady = false;
  const eggReadyDeffered = new Deferred();

  let eurekaConfig = app.config.eureka || {};
  eurekaConfig = Object.assign({
    logger: app.logger,
  }, eurekaConfig);

  if (!eurekaConfig.instance.port) {
    const port = app.options.port || app.config.cluster.listen.port;
    eurekaConfig.instance.port = {
      $: port,
      '@enabled': 'true',
    }
  }

  const client = new Eureka(eurekaConfig);

  Object.assign(app, 'eurekaClient', {
    get () {
      return client;
    },
  });

  if (eurekaConfig.eureka && eurekaConfig.eureka.registerWithEureka === false) {
    app.logger.info('[egg-eureka-pro]: app will not register with Eureka');
  }

  client.start(() => {
    app.logger.info('[egg-eureka-pro]: client started');
  });

  async function sendRegistry () {
    if (!eggReady) {
      await eggReadyDeffered.promise;
    }
    app.messenger.sendToApp('eureka:RegistryUpdated', client.cache.app);
  }

  client.on('registryUpdated', async () => {
    sendRegistry();
  });

  app.messenger.on('eureka:RegistryUpdated', () => {
    sendRegistry();
  });

  app.messenger.once('egg-ready', () => {
    eggReady = true;
    eggReadyDeffered.resolve();
  });

  return client;
};

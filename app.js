'use strict';
const { Deferred } = require('./lib/util');

module.exports = app => {
  let cachedInstances = {};
  let isEurekaReady = false;
  const eurekaDeffered = new Deferred();

  app.messenger.on('eureka:RegistryUpdated', instances => {
    cachedInstances = instances;

    if (!isEurekaReady) {
      isEurekaReady = true;
      eurekaDeffered.resolve();
    }
  });

  app.messenger.once('egg-ready', () => {
    setTimeout(() => {
      !isEurekaReady && app.messenger.sendToAgent('eureka:RegistryUpdated');
    }, 2000);
  });

  app.eureka = {
    async getAllInstances () {
      if (!isEurekaReady) {
        await eurekaDeffered.promise;
      }
      return cachedInstances;
    },
    async getInstancesByAppId (appId) {
      if (!appId) {
        throw new Error('Unable to query instances with no appId');
      }
      if (!isEurekaReady) {
        await eurekaDeffered.promise;
      }

      const instances = cachedInstances[appId.toUpperCase()] || [];
      if (instances.length === 0) {
        app.logger.warn('[egg-eureka-pro] Unable to retrieve instances for appId: ' + appId);
      }

      return instances;
    }
  };
};

'use strict';

/**
 * egg-eureka default config
 */
exports.eureka = {
  instance: {
    app: 'egg-eureka-pro',
    instanceId: 'egg-eureka-pro',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: {
      $: 8080,
      '@enabled': 'true',
    },
    homePageUrl: null,
    statusPageUrl: null,
    healthCheckUrl: null,
    secureVipAddress: '127.0.0.1',
    vipAddress: '127.0.0.1',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    servicePath: '/eureka/apps/',
    host: '127.0.0.1',
    port: 8761,
  },
};

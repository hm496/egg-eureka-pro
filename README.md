# egg-eureka-pro
[eureka-js-client](https://github.com/jquatier/eureka-js-client) plugin for egg.      
## Install

```sh
$ npm i egg-eureka-pro
```

## Configuration

`egg-eureka-pro` support all configurations in [eureka-js-client](https://github.com/jquatier/eureka-js-client). and with default configurations below:

```js
// default configurations
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
    }
  },
  eureka: {
    servicePath: '/eureka/apps/',
    host: '127.0.0.1',
    port: 8761,
  }
};
```

```js
// {app_root}/config/config.default.js
exports.eureka = {
  // instance: {},
  // eureka: {},
};
```

## Usage

In controller, you can use `app.eureka.getAllInstances` and `app.eureka.getInstancesByAppId` to get eureka instances.

```js
// app/controller/home.js

module.exports = app => {
  return class HomeController extends app.Controller {
    async index() {
      const { ctx, app } = this;
      // get all instances
      const allInstances = await app.eureka.getAllInstances();
      // get instances by AppId
      const appInstances = await app.eureka.getInstancesByAppId('appId');
      ctx.body = 'eureka';
    }
  };
};
```

## Questions & Suggestions

Please open an issue [here](https://github.com/hm496/egg-eureka-pro/issues).

## License

[MIT](https://github.com/hm496/egg-eureka-pro/blob/master/LICENSE)

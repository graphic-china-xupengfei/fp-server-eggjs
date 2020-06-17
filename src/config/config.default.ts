import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
});

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_1591971224868_9040`;
  // add your config here
  config.middleware = [
    // 'history',
    'shopify',
    'verify',
    // 'graphql',
  ];
  config.verify = {
    match(ctx) {
      if (ctx.request.url === '/graphql1') {
        return true;
      }
      return false;
    },
  };
  // config.graphql = {
  //   router: '/graphql1',
  // };
  config.security = {
    xframe: {
      enable: false,
    },
    csrf: false,
  };
  config.session = {
    secure: true,
    sameSite: 'None',
  };
  config.cors = { // 解决跨域访问
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
    origin: () => '*', // 这边不能为*号，需要指定明确的、与请求网页一致的域名
  };

  // 静态文件配置
  config.static = {
    prefix: '/',
  };
  config.shopify = {
    shop: process.env.SHOP,
    accessToken: process.env.ACCESS_TOKEN,
    appAddress: process.env.APP_ADDRESS,
    apiKey: process.env.SHOPIFY_API_KEY,
    secret: process.env.SHOPIFY_API_SECRET,
    accessMode: 'online',
    scopes: [process.env.APP_SCOPES],
    afterAuth(ctx) {
      const { accessToken } = ctx.session;
      console.log(accessToken);
      ctx.redirect('/');
    },

  };
  return config;
};

import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_1591971224868_9040`;
  const SHOPIFY_API_KEY = '42e50ceb9dc37cdc65db499b3ff87b17';
  const SHOPIFY_API_SECRET = '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';
  const SCOPE = 'write_products, write_orders';
  // add your config here
  config.middleware = [
    'example',
    'shopify',
    'verify',
    'graphql',
  ];
  config.verify = {
    match(ctx) {
      if (ctx.request.url === '/graphql1') {
        return true;
      }
      return false;
    },
  };
  config.graphql = {
    router: '/graphql1',
  };
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
  config.shopify = {
    apiKey: SHOPIFY_API_KEY,
    secret: SHOPIFY_API_SECRET,
    accessMode: 'online',
    scopes: [SCOPE],
    afterAuth(ctx) {
      const { accessToken } = ctx.session;
      console.log(accessToken);
      ctx.redirect(`/${accessToken}`);
    },

  };

  return config;
};

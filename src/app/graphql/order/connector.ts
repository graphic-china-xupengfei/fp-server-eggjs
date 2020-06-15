class OrderConnector {
  ctx: any;

  requestContext: any;

  constructor(ctx) {
    this.ctx = ctx;
    this.requestContext = this.ctx.requestContext;
  }

  async getOrders() {
    // 获取 ioc 容器中的对象
    // 注意，这里必须实时拿取 userService 实例，每个请求周期的实例都不同
    const graphqlService = await this.requestContext.getAsync('graphqlService');
    const data = await graphqlService.query();
    return {
      success: true,
      message: `get service data ${JSON.stringify(data)}`,
      data: { id: '1' },
    };
  }
}
module.exports = OrderConnector;

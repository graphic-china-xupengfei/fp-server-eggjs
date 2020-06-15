import {
  Context, inject, controller, get, provide,
} from 'midway';

@provide()
@controller('/')
export default class HomeController {
  @inject()
  ctx: Context;

  @inject()
  logger;

  @get('/')
  async index() {
    this.logger.info('ctx', this.ctx.query);
    this.ctx.body = 'index';
  }
}

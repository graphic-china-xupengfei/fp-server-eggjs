import {
  Context, controller, post, get, inject, provide,
} from 'midway';
import { IGraphglService } from '../interface/graphql-interface';

@provide()
@controller('/graphql-shopify')
export default class GraphqlController {
  @inject()
  ctx: Context;

  @inject('graphqlService')
  service: IGraphglService;

  @inject()
  logger;

  @get('/')
  async get(): Promise<void> {
    this.logger.info('graphql body:', this.ctx.host);
    this.logger.info('session:', this.ctx.session.accessToken);
    this.ctx.body = { success: true, message: 'OK' };
  }

  @post('/')
  async query(): Promise<void> {
    this.logger.info('ACCESS_TOKEN: ', this.ctx.session.accessToken);
    const result = await this.service.query(this.ctx.request.body.query);
    this.ctx.body = { success: true, message: 'OK', data: result };
  }
}

import {
  Context, controller, get, inject, provide,
} from 'midway';
import { IOrderService, IOrderResult } from '../interface/order';

@provide()
@controller('/order')
export default class OrderController {
  @inject()
  ctx: Context;

  @inject('orderService')
  service: IOrderService;

  @get('/:id')
  async getUser(): Promise<void> {
    console.log(1, this.ctx.session.accessToken);
    const user: IOrderResult = await this.service.list();
    this.ctx.body = { success: true, message: 'OK', data: user };
  }
}

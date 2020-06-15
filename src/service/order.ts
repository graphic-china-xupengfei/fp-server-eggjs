import { provide, inject, Context } from 'midway';
import { GraphQLClient } from 'graphql-request';
import { IOrderService, IOrderResult } from '../interface/order';

@provide('orderService')
export default class OrderService implements IOrderService {
  @inject()
  ctx: Context;

  async list(): Promise<IOrderResult> {
    console.log(2, this.ctx.session.accessToken);
    const client = new GraphQLClient(`https://${this.ctx.session.shop}/admin/api/2020-04/graphql.json`, {
      headers: { 'X-Shopify-Access-Token': this.ctx.session.accessToken },
    });
    const query = `
      {
        shop {
          name
          email
          url
          description
          id
          contactEmail
          currencyCode
        }
      }
    `;
    const shop = await client.request(query);
    return shop;
  }
}

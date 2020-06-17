import {
  provide, inject, config, Context,
} from 'midway';
import { GraphQLClient } from 'graphql-request';
import { IGraphglService } from '../interface/graphql-interface';

@provide('graphqlService')
export default class GraphglService implements IGraphglService {
  @inject()
  ctx: Context;

  @config('shopify')
  config;

  async query(queryString): Promise<Record<string, unknown>> {
    const shop = this.ctx.session.shop || this.config.shop;
    const accessToken = this.ctx.session.accessToken || this.config.accessToken;
    const client = new GraphQLClient(`https://${shop}/admin/api/2020-04/graphql.json`, {
      headers: { 'X-Shopify-Access-Token': accessToken },
    });
    const result = await client.request(queryString);
    return result;
  }
}

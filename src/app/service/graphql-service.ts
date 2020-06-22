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
    let client: GraphQLClient;
    const shop = this.ctx.session.shop || this.config.shop;
    const accessToken = this.ctx.session.accessToken || this.config.accessToken;
    if (accessToken) {
      const url = `https://${shop}/admin/api/2020-04/graphql.json`;
      client = new GraphQLClient(url, {
        headers: { 'X-Shopify-Access-Token': accessToken },
      });
    } else if (this.config.privateApiKey) {
      const url = `https://${this.config.privateApiKey}:${this.config.privatePassword}@${shop}/admin/api/2020-04/graphql.json
        `;
      client = new GraphQLClient(url);
    }
    const result = await client.request(queryString);
    return result;
  }
}

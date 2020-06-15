import { provide, inject, Context } from 'midway';
import { GraphQLClient } from 'graphql-request';
import { IGraphglService } from '../interface/graphql-interface';

@provide('graphqlService')
export default class GraphglService implements IGraphglService {
  @inject()
  ctx: Context;

  async query(queryString): Promise<Record<string, unknown>> {
    const client = new GraphQLClient(`https://${this.ctx.session.shop}/admin/api/2020-04/graphql.json`, {
      headers: { 'X-Shopify-Access-Token': this.ctx.session.accessToken },
    });
    const result = await client.request(queryString);
    return result;
  }
}

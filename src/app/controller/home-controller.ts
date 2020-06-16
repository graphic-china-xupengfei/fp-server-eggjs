import {
  Context, inject, controller, get, provide, config,
} from 'midway';
import { fs } from 'mz';
import path from 'path';

@provide()
@controller('/')
export default class HomeController {
  @inject()
  ctx: Context;

  @inject()
  logger;

  @config('static')
  config;

  @get('/')
  async index() {
    const tpl = path.join(this.config.dir, 'index.html');

    this.ctx.body = await fs.readFile(tpl, 'utf-8');
  }
}

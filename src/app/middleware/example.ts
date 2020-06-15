import { Context } from 'midway';

export default () => async (ctx: Context, next: () => void) => {
  await next();
};

import { Application } from 'midway';

export default (app: Application): void => {
  app.beforeStart(async () => {
    console.log('✅ FP server launched');
  });
};

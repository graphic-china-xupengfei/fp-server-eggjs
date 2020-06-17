import { Application } from 'midway';

export default (app: Application): void => {
  app.ready(async () => {
    console.log('✅ FP server launched');
  });
};

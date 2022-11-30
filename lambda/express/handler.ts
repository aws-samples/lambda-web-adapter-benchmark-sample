import app from './app';
import serverlessExpress from '@vendia/serverless-express';

exports.handler = async (event: any, context: any, callback: any) => {
  return serverlessExpress({ app })(event, context, callback);
};

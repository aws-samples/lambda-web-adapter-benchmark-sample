#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LambdaWebAdapterDemoStack } from '../lib/lambda-web-adapter-demo-stack';

const app = new cdk.App();
new LambdaWebAdapterDemoStack(app, 'LambdaWebAdapterDemoStack', {
  env: {
    region: 'us-east-1',
  },
});

// cdk nagによる脆弱性検査
// import { Aspects } from 'aws-cdk-lib';
// import { AwsSolutionsChecks } from 'cdk-nag';
// Aspects.of(app).add(new AwsSolutionsChecks());

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { CfnOutput, Duration } from 'aws-cdk-lib';
import { HttpApi } from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Platform } from 'aws-cdk-lib/aws-ecr-assets';

export class LambdaWebAdapterDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    {
      const base = new Construct(this, 'WebAdapter');
      const handler = new lambda.DockerImageFunction(base, 'Handler', {
        code: lambda.DockerImageCode.fromImageAsset('./lambda/express', {
          file: 'Dockerfile',
          platform: Platform.LINUX_AMD64,
        }),
        timeout: Duration.seconds(30),
      });

      const integration = new HttpLambdaIntegration('Integration', handler);
      const api = new HttpApi(base, 'Api', { defaultIntegration: integration });

      new CfnOutput(base, 'ApiEndpoint', {
        value: `${api.apiEndpoint}`,
      });
    }

    {
      const base = new Construct(this, 'Docker');
      const handler = new lambda.DockerImageFunction(base, 'Handler', {
        code: lambda.DockerImageCode.fromImageAsset('./lambda/express', {
          file: 'lambda.Dockerfile',
          platform: Platform.LINUX_AMD64,
        }),
        timeout: Duration.seconds(30),
      });

      const integration = new HttpLambdaIntegration('Integration', handler);
      const api = new HttpApi(base, 'Api', { defaultIntegration: integration });

      new CfnOutput(base, 'ApiEndpoint', {
        value: `${api.apiEndpoint}`,
      });
    }

    {
      const base = new Construct(this, 'Nodejs');

      const handler = new NodejsFunction(base, 'Handler', {
        entry: 'lambda/express/handler.ts',
        runtime: Runtime.NODEJS_16_X,
        // https://tmokmss.hatenablog.com/entry/20220509/1652103822
        depsLockFilePath: 'lambda/express/package-lock.json',
        bundling: {
          commandHooks: {
            beforeBundling: (i, o) => [`cd ${i} && npm install`],
            afterBundling: (i, o) => [],
            beforeInstall: (i, o) => [],
          },
        },
      });

      const integration = new HttpLambdaIntegration('Integration', handler);
      const api = new HttpApi(base, 'Api', { defaultIntegration: integration });

      new CfnOutput(base, 'ApiEndpoint', {
        value: `${api.apiEndpoint}`,
      });
    }
  }
}

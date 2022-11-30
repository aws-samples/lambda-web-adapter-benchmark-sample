# Lambda Web Adapter benchmark sample
[Lambda Web Adapter](https://github.com/awslabs/aws-lambda-web-adapter) のベンチマーク用CDKプロジェクトです。
このサンプルを用いて取得したベンチマークの記事はこちら: [TODO: 記事のURL貼る]()

具体的には、以下をデプロイします:

* 以下3つのアプリケーションについて、Lambda関数とAPI Gateway HTTP API
    1. serverless-expressを使用する場合 (Node.jsランタイム)
    2. serverless-expressを使用する場合 (Dockerランタイム)
    3. Lambda Web Adapterを使用する場合 (Dockerランタイム)

Expressアプリの実装は [`lambda/express`](lambda/express) ディレクトリにあります。

## デプロイ
**前提条件**: 以下をインストールしてください:

* Node.js (v16以上を推奨)
* Docker
* AWS CLI (Administrator権限の設定を推奨)

以下のコマンドを実行して、CDKスタックをデプロイしてください。

```
npm ci
npx cdk bootstrap
npx cdk deploy
```

デプロイは通常3分程度で完了します。完了後、CLIに下記のメッセージが表示されます:

```
Outputs:
LambdaWebAdapterDemoStack.DockerApiEndpoint423F20B6 = https://xxxxxx.execute-api.us-east-1.amazonaws.com
LambdaWebAdapterDemoStack.NodejsApiEndpoint17369EC6 = https://yyyyyy.execute-api.us-east-1.amazonaws.com
LambdaWebAdapterDemoStack.WebAdapterApiEndpoint56B6333E = https://zzzzzz.execute-api.us-east-1.amazonaws.com
```

こちらはデプロイしたHTTP APIのエンドポイントです。アクセスするとそれぞれ上記1〜3のLambdaが起動します。

## ベンチマーク
上記のAPIはパブリックにアクセス可能なため、任意の負荷試験方法を利用できます。

中でも以下の方法は、AWSで簡単に利用開始することができるためおすすめです:

* [Distributed Load Testing on AWS](https://aws.amazon.com/solutions/implementations/distributed-load-testing-on-aws/)
* [Distributed Load Testing with Locust on Amazon ECS](https://github.com/aws-samples/distributed-load-testing-with-locust-on-ecs)

## メトリクス集計
負荷試験ツールがレポートするメトリクスに加えて、必要に応じてCloudWatch メトリクスもご利用ください。

例えば、以下のクエリを [CloudWatch Logs Insights](https://console.aws.amazon.com/cloudwatch/home#logsV2:logs-insights) で実行すると、指定期間のLambda実行のコールドスタート時間や処理時間を集計できます。

```
stats count(@initDuration), count(@duration), 
  avg(@initDuration), pct(@initDuration, 99), max(@initDuration), min(@initDuration), stddev(@initDuration),
  avg(@duration), pct(@duration, 99), max(@duration), min(@duration), stddev(@duration)
| filter @message like /^REPORT/
```

## Clean up
検証が完了した後は、下記のコマンドで作成されたAWSリソースを削除することができます。

```sh
cd cdk
npx cdk destroy --force
```

## Security
See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License
This library is licensed under the MIT-0 License. See the LICENSE file.

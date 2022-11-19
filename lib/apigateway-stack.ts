import { Stack, StackProps } from 'aws-cdk-lib';
import { Cors, EndpointType, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class ApiGatewayStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    postLambdaFunction: IFunction,
    getLambdaFunction: IFunction,
    props?: StackProps,
  ) {
    super(scope, id, props);

    const api = new RestApi(this, 'ApiGW', {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
      },
      endpointConfiguration: {
        types: [EndpointType.EDGE],
      },
    });

    api.root.addMethod('POST', new LambdaIntegration(postLambdaFunction));
    api.root.addMethod('GET', new LambdaIntegration(getLambdaFunction));
  }
}

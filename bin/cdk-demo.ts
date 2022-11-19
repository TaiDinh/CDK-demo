import * as cdk from 'aws-cdk-lib';
import { DynamoDBStack } from '../lib/dynamodb-stack';
import { LambdaStack } from '../lib/lambda-stack';
import { ApiGatewayStack } from './../lib/apigateway-stack';

const app = new cdk.App();

const { contractMessageTable } = new DynamoDBStack(app, 'dynamoDBStack');
const { getLambdaFunction, postLambdaFunction } = new LambdaStack(app, 'LambdaStack', contractMessageTable);
new ApiGatewayStack(app, 'ApiGatewayStack', postLambdaFunction, getLambdaFunction);

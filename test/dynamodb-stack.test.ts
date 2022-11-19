import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DynamoDBStack } from '../lib/dynamodb-stack';

test('ContractMessage Table Created', () => {
  const app = new cdk.App();
  const stack = new DynamoDBStack(app, 'MyTestDynamoDBStack');
  
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::DynamoDB::Table', {
    TableName: 'contact-messages'
  });
  template.hasResource('AWS::DynamoDB::Table', {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH"
        },
        {
          AttributeName: "createdAt",
          KeyType: "RANGE"
        }
      ],
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S"
        },
        {
          AttributeName: "createdAt",
          AttributeType: "S"
        }
      ],
      BillingMode: "PAY_PER_REQUEST",
      TableName: "contact-messages"
    },
    UpdateReplacePolicy: "Delete",
    DeletionPolicy: "Delete"
  })
});

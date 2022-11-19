import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { join } from 'path';

export class LambdaStack extends Stack {
  private contactMessageTable: Table;

  public postLambdaFunction: Function;
  public getLambdaFunction: Function;

  constructor(scope: Construct, id: string, contactMessageTable: Table, props?: StackProps) {
    super(scope, id, props);
    this.contactMessageTable = contactMessageTable;

    this.createLambdaFunction();
    this.attachRolePolicy();
  }

  private createLambdaFunction() {
    const nodeJsFunctionProps: NodejsFunctionProps = {
      runtime: Runtime.NODEJS_14_X,
      memorySize: 512,
      timeout: Duration.seconds(10),
      environment: {
        ENVIRONMENT: process.env.ENVIRONMENT || 'dev',
        TABLE_NAME: this.contactMessageTable.tableName,
      },
    };
    this.postLambdaFunction = new NodejsFunction(this, 'PostLambdaFunction', {
      entry: join(__dirname, '/../src/lambda-post.ts'),
      ...nodeJsFunctionProps,
    });

    this.getLambdaFunction = new NodejsFunction(this, 'GetLambdaFunction', {
      entry: join(__dirname, '/../src/lambda-get.ts'),
      ...nodeJsFunctionProps,
    });
  }

  private attachRolePolicy() {
    this.contactMessageTable.grantWriteData(this.postLambdaFunction);
    this.contactMessageTable.grantReadData(this.getLambdaFunction);
  }
}

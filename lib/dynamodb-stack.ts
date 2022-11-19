import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class DynamoDBStack extends Stack {
  public contractMessageTable: Table;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.contractMessageTable = new Table(this, 'ContactMessage', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'createdAt',
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      tableName: 'contact-messages',
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}

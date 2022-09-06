import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

export class SoftserveStack extends cdk.Stack {
  public static readonly APP = 'Softserve';

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // vpc with 2 subnets
    const vpc = new ec2.Vpc(this, 'VPC', {
      natGateways: 0,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: SoftserveStack.APP,
          subnetType: ec2.SubnetType.PUBLIC,
        },
      ],
    });
  }
}

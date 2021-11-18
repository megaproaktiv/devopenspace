import { Stack, StackProps } from 'aws-cdk-lib';
import { aws_ec2 } from 'aws-cdk-lib';
import { aws_ssm } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class VpcStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

  // The code that defines your stack goes here
  const vpc = new aws_ec2.Vpc(this, 'baseVPC', {
      cidr: "10.0.0.0/16"
   })

   new aws_ssm.StringParameter(this, "basevpc", {
     stringValue: vpc.vpcId,
     parameterName: "devopenspacevpc",
     description: "Vpc ID"
   })




  }
}

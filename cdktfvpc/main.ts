import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { AwsProvider } from './.gen/providers/aws'
import { VPC } from './.gen/providers/aws'

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // define resources here
    new AwsProvider(this, 'aws', {
      region: 'eu-central-1',
    })

    new VPC.Vpc(this, "basevpc", {
      cidrBlock: "10.0.0.0/16"
    })



  }
}

const app = new App();
new MyStack(app, "cdktfvpc");
app.synth();

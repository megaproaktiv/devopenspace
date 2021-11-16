
import {VpcStack as Vpc} from '../lib/vpc-stack';
import { App } from 'aws-cdk-lib';


test('VPC created', () => {
    
    const app = new App()
    // WHEN
    const stack = new Vpc(app, "testvpc")
    // THEN
    const actual = app.synth().getStackArtifact(stack.artifactId).template;
    expect(actual.Resources.TheVPC92636AB0.Properties.CidrBlock).toEqual("10.0.0.0/16")

});

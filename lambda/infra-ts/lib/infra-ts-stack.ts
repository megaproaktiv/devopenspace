import { aws_dynamodb, aws_lambda_event_sources, aws_s3, aws_ssm, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { aws_lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { join } from 'path';


export class InfraTsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const fn = new aws_lambda.Function(this, 's3eventwriter',
    {
      code: aws_lambda.Code.fromAsset(join(__dirname, '../../app/dist/main.zip')),
      handler: 'main',
      runtime: aws_lambda.Runtime.GO_1_X,
      memorySize: 1024,
    });
   
    // Bucket start ****************
    // *
    const bucky = new aws_s3.Bucket(this, 'incoming-gov2', {
      blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL,
    });
    // *
    // Tell Lambda the dynamic bucket name
    fn.addEnvironment('Bucket', bucky.bucketName);
    // *
    // give lambda read rights
    bucky.grantRead(fn);
    // *
    // Bucket end *******************


    // Event start *******************
    fn.addEventSource( new aws_lambda_event_sources.S3EventSource(bucky, {
      events: [
        aws_s3.EventType.OBJECT_CREATED,
      ],
    }));
    // Event End   *******************

    //** Dynamodb start */
    const table = new aws_dynamodb.Table(this, 'items', {
      partitionKey: {
        name: 'itemID',
        type: aws_dynamodb.AttributeType.STRING,
      },
      removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production code

    });

    fn.addEnvironment('TableName', table.tableName);
    table.grantReadWriteData(fn);
    //** Dynamodb End */


    new aws_ssm.StringParameter(this, "devopenspacefunction", {
      stringValue: fn.functionName,
      parameterName: "devopenspacefunction",
      description: "Lambda function name"
    })

    new aws_ssm.StringParameter(this, "devopenspacetable", {
      stringValue: table.tableName,
      parameterName: "devopenspacetable",
      description: "dynamodb Table name"
    })

    new aws_ssm.StringParameter(this, "devopenspacebucket", {
      stringValue: bucky.bucketName,
      parameterName: "devopenspacebucket",
      description: "Bucket Name"
    })


  }
}

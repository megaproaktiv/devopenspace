#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfraTsStack } from '../lib/infra-ts-stack';

const app = new cdk.App();
new InfraTsStack(app, 'objectlister', {});
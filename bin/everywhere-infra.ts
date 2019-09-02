#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { EverywhereInfraStack } from '../lib/everywhere-infra-stack';

const app = new cdk.App();
new EverywhereInfraStack(app, 'EverywhereInfraStack');
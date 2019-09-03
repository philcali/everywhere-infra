#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { EverywhereStack } from '../lib/everywhere-stack';
import env from '../env';

const app = new cdk.App();
new EverywhereStack(app, 'EverywhereStack', {
  env: {
    account: env.account,
    region: env.region
  }
});

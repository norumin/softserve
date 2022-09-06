#!/usr/bin/env node

import 'source-map-support/register';
import { App, Tags } from 'aws-cdk-lib';
import capitalize = require('lodash.capitalize');
import { SoftserveStack } from '../lib/softserve-stack';

// load environment variables
require('dotenv').config();

/**
 * Configuration for the app.
 */
const config = {
  stage: process.env.STAGE || 'production',
  git_repo_url: process.env.GIT_REPO_URL || 'git://github.com/norumin/softserve.git',
};

/**
 * The app.
 */
const app = new App();

// default tags of the app
Tags.of(app).add('Stage', config.stage);
Tags.of(app).add('Repo', config.git_repo_url);

/**
 * The stack.
 */
const stack = new SoftserveStack(
  app,
  `${capitalize(SoftserveStack.APP.toLowerCase())}${capitalize(config.stage.toLowerCase())}`,
  {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  }
);

// default tags of the stack
Tags.of(stack).add('App', SoftserveStack.APP);

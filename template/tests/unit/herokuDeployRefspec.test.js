/**
 * Locks the Heroku deploy refspec used under Bitbucket's detached HEAD.
 * Run: node tests/unit/herokuDeployRefspec.test.js
 */
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const pipeline = fs.readFileSync(
  path.join(__dirname, '../../bitbucket-pipelines.yml'),
  'utf8',
);

assert.match(
  pipeline,
  /git push\s+\S*git\.heroku\.com\S*\s+HEAD:refs\/heads\/master/,
  'Heroku deploy must push HEAD:refs/heads/master for detached CI checkouts',
);

assert.doesNotMatch(
  pipeline,
  /git push\s+\S*git\.heroku\.com\S*\s+HEAD\s*$/m,
  'Bare git push ... HEAD fails on Bitbucket detached HEAD',
);

console.log('herokuDeployRefspec.test.js: ok');

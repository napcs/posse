import { MockActivityEnvironment } from '@temporalio/testing';
import { describe, it } from 'mocha';
import * as activities from '../activities';
import assert from 'assert';

/*
describe('tweet activity', async () => {
  it('successfully tweets the content', async () => {
    const env = new MockActivityEnvironment();
    const tweet = 'Hello from a Temporal application!';
    const result = await env.run(activities.tweet, tweet);
    assert.equal(result, 'Hello from a Temporal application!');
  });
});

describe('toot activity', async () => {
  it('successfully toots the content', async () => {
    const env = new MockActivityEnvironment();
    const toot = 'Hello from a Temporal application!';
    const result = await env.run(activities.toot, toot);
    assert.equal(result, 'Hello from a Temporal application!');
  });
});

describe('bluesky activity', async () => {
  it('successfully post the content to bluesky', async () => {
    const env = new MockActivityEnvironment();
    const post = 'Hello from a Temporal application!';
    const result = await env.run(activities.blueskyPost, post);
    assert.equal(result, 'Hello from a Temporal application!');
  });
});

*/

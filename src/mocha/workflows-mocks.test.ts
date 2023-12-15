import { TestWorkflowEnvironment } from '@temporalio/testing';
import { after, before, it } from 'mocha';
import { Worker } from '@temporalio/worker';
import { posse } from '../workflows';
import assert from 'assert';

describe('Example workflow with mocks', () => {
  let testEnv: TestWorkflowEnvironment;

  before(async () => {
    testEnv = await TestWorkflowEnvironment.createLocal();
  });

  after(async () => {
    await testEnv?.teardown();
  });

  it('successfully completes the Workflow with a mocked Activity', async () => {
    const { client, nativeConnection } = testEnv;
    const taskQueue = 'test';

    const worker = await Worker.create({
      connection: nativeConnection,
      taskQueue,
      workflowsPath: require.resolve('../workflows'),
      activities: {
        tweet: async () => 'Hello, Temporal!',
        toot: async () => 'Hello, Temporal!',
        blueskyPost: async () => 'Hello, Temporal!',
      },
    });

    const result = await worker.runUntil(
      client.workflow.execute(posse, {
        args: ['Hello Temporal!'],
        workflowId: 'test',
        taskQueue,
      })
    );

    const expected = {
      tweet: 'Hello, Temporal!',
      toot: 'Hello, Temporal!',
    };

    assert.strictEqual(result, expected);
  });
});

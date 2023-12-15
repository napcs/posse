// @@@SNIPSTART posse_workflow
import * as workflow from '@temporalio/workflow';
import type { PosseResult } from './shared';
import type * as activities from './activities';

const { tweet, toot, blueskyPost } = workflow.proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
  retry: {
    initialInterval: '1s',
    backoffCoefficient: 2,
    maximumAttempts: Infinity,
  },
});

export async function posse(text: string): Promise<PosseResult> {
  const tweetPromise = tweet(text);
  const tootPromise = toot(text);
  const blueskyPromise = blueskyPost(text);
  const [tweetResult, tootResult, blueskyResult] = await Promise.all([tweetPromise, tootPromise, blueskyPromise]);

  return { tweetResult, tootResult, blueskyResult };
}
// @@@SNIPEND

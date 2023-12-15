// @@@SNIPSTART posse_activities
import 'dotenv/config';
import { TwitterApi } from 'twitter-api-v2';
import { createRestAPIClient } from 'masto';
import { BskyAgent } from '@atproto/api';

export async function tweet(text: string): Promise<string> {
  const client = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY as string,
    appSecret: process.env.TWITTER_CONSUMER_SECRET as string,
    accessToken: process.env.TWITTER_ACCESS_TOKEN_KEY as string,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
  });

  const writer = client.readWrite;
  const result = await writer.v2.tweet(text);

  return result.data.text;
}

export async function toot(text: string): Promise<string> {
  const masto = createRestAPIClient({
    url: process.env.MASTODON_URL as string,
    accessToken: process.env.MASTODON_TOKEN,
  });

  const status = await masto.v1.statuses.create({
    status: text,
    visibility: 'public',
  });

  return status.content;
}

export async function blueskyPost(text: string): Promise<string> {
  const agent = new BskyAgent({ service: 'https://bsky.social' });

  await agent.login({
    identifier: process.env.BLUESKY_USER as string,
    password: process.env.BLUESKY_PASS as string,
  });

  await agent.post({ text });

  return text;
}
// @@@SNIPEND

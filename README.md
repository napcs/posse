# Publish On Own Site, Syndicate Everywhere (POSSE)

Demo code. Not for production use.

Send a single message to Twitter, Mastodon, and BlueSky using Temporal to guarantee delivery of messages.

How it works
- Web form posts to web server
- Web server uses Temporal Client to start a Workflow Execution
- Temporal Workers send the messages simultaneously by executing the Workflow.
- Failures are retried indefinitely.

Limitations:
- Only for sending initial messages. Cannot communicate, read, or thread.
- No support for DMs or replies.
- Twitter API counts ALL urls as 23 characters and I don't have defenses against that. Keep your messages under 280 characters and remember that even short URLs get expanded to 23 characters. Twitter posting will fail forever, as their API doesn't give a reason for the failure that's distinct. I did not write code to catch this.
- You must use the Temporal Web UI to cancel a failed or stuck workflow. Visit https://localhost:8233 to locate and terminate the Workflow.


# Running the project

Copy `.env.example` to `.env` and fill out the values with your X/Twitter API keys, Mastodon keys, and BlueSky keys.

* Twitter/X api is free for posting only. Must register an app.
* Mastodon api is free and just needs your api key for your app.
* BlueSky uses your username and password for their API.

Next, install dependencies with `npm install`.

Then install the Temporal CLI according to [the installation instructions for your platform](https://learn.temporal.io/getting_started/#set-up-your-development-environment).

To run the system, you need to start three pieces:
- The Temporal CLI running as a development server
- A Worker process.
- The front-end web service to display the form.

You can use `foreman` to do this with the following command:

```bash
npm run start.all
```

This will start all three components and stream the results to your screen.

Alternatively, you can start all three processes separately:

Start the Temporal server first:

```bash
$ temporal server start-dev --db-filename temporal.db
```

Then start a Temporal Worker process in another window:

```bash
$ npm start
```

Finally, start the web server in a third window:

```bash
$ npm run start.server
```

Visit `http://localhost:3000` and enter your content and publish it.

## License

MIT.

No warranty.

This is not an official Temporal example and should only be used to explore the platform. It's not production ready.

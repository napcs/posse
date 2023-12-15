import express, { Request, Response } from 'express';
import path from 'path';

import { Connection, Client } from '@temporalio/client';
import { posse } from '../src/workflows';
import { nanoid } from 'nanoid';
import { PosseResult, TASK_QUEUE_NAME} from '../src/shared';

const app = express();
let client: Client;

interface FormData {
  text: string
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

// Temporal Client Initialization
async function initializeTemporal() {
  const connection = await Connection.connect({ address: 'localhost:7233' });
  client = new Client({ connection });
}

// @@@SNIPSTART posse_webapp
async function startWorkflow(data: FormData ): Promise<PosseResult> {
  const handle = await client.workflow.start(posse, {
    args: [data.text],
    taskQueue: TASK_QUEUE_NAME,
    workflowId: 'workflow-' + nanoid(),
  });

  return await handle.result();
}

app.post('/submit', async (req: Request, res: Response) => {
  try {
    const result: PosseResult = await startWorkflow({text: req.body.text});
    res.send(`<p>Messages sent succesfully</p>`);
  } catch (e) {
    res.send('<p>An error occurred</p>');
  }
});
// @@@SNIPEND

// Start the server
async function run() {
  await initializeTemporal();
  app.listen(3000, () => console.log('Server running on port 3000'));
}

run().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

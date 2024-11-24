import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { layout } from './layout';

const app = new Hono();

app
  .get('*', layout)
  .get('/', async (c) => {
    return c.render(
      <div class="p-4 flex flex-col">
        <h1 class="text-4xl font-bold mb-4">Hono with htmx</h1>
        <div id="indicator" class="hidden [&.htmx-request]:block animate-pulse">
          Updating...
        </div>
        <button
          id="request-button"
          class="peer"
          hx-put="/messages"
          hx-indicator="#indicator"
        >
          Issue Request
        </button>
        <button onclick="htmx.trigger('#request-button', 'htmx:abort')">
          Cancel Requesta
        </button>
      </div>
    );
  })
  .put('/messages', async (c) => {
    console.log('messages');
    await new Promise((r) => setTimeout(r, 3000));
    return c.text('message');
  });

app.routes.forEach(({ path, method }) =>
  console.log('>', method.toUpperCase(), path)
);

serve(app);

import { test, expect, request } from '@playwright/test';

const apiBase = process.env.API_BASE_URL ?? 'http://127.0.0.1:8000/api';
const webBase = process.env.WEB_BASE_URL ?? 'http://127.0.0.1:8000';
const authToken = process.env.AUTH_BEARER_TOKEN ?? '';

const headers = authToken
  ? { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' }
  : { 'Content-Type': 'application/json' };

const threads: Record<string, string[]> = {
  conv_users_analysis: [
    'show me users',
    'show users with roles',
    'show users in table format',
    'show first user orders count',
    'what is the last order of that user',
    'show items of that order',
  ],
  conv_products_analysis: [
    'show me all products',
    'share top 5 trending products',
    'show them in table format',
    'give me SQL query to get trending products',
    'show last added product',
  ],
  conv_sales_analysis: [
    'show orders of this month',
    'how much sales this month',
    'show sales with tax',
    'show best selling product',
    'show best selling product quantity',
  ],
  conv_user_orders: [
    'show users list',
    'show user Arjun orders',
    'show orders of today',
    'show only active orders',
    'skip first result and show remaining',
  ],
  conv_business_queries: [
    'how many users registered this month',
    'how many orders created this month',
    'total revenue this month',
    'average order value this month',
    'show top customer this month',
  ],
  conv_ai_discussion: [
    'how does LLM work',
    'explain embeddings',
    'how vector search works',
    'explain RAG architecture',
  ],
  conv_dev_help: [
    'how to optimize mysql queries',
    'how to use indexing in mysql',
    'difference between join and subquery',
  ],
  conv_general_chat: [
    'what is laravel',
    'what is eloquent orm',
    'how laravel handles database relations',
  ],
};

test.describe('Laravel AI Engine API thread validation', () => {
  for (const [conversationId, queries] of Object.entries(threads)) {
    test(`thread: ${conversationId}`, async ({}) => {
      const ctx = await request.newContext({ extraHTTPHeaders: headers });

      for (const query of queries) {
        const response = await ctx.post(`${apiBase}/ai-v2/query`, {
          data: {
            query,
            format: 'json',
            conversation_id: conversationId,
          },
        });

        expect([200, 401, 403, 422, 429]).toContain(response.status());

        if (response.status() === 200) {
          const body = await response.json();
          expect(body).toHaveProperty('data');
          expect(body.data).toHaveProperty('conversation_id');
          expect(body.data.conversation_id).toBe(conversationId);
          expect(body.data).toHaveProperty('completion');
        }
      }

      await ctx.dispose();
    });
  }
});

test.describe('Frontend smoke checks', () => {
  test('landing page loads and has auth CTAs', async ({ page }) => {
    await page.goto(webBase, { waitUntil: 'domcontentloaded' });
    await expect(page.getByText('Enterprise AI Platform for Laravel 12')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
  });

  test('dashboard route redirects or renders', async ({ page }) => {
    await page.goto(`${webBase}/dashboard`, { waitUntil: 'domcontentloaded' });
    const url = page.url();
    expect(url.includes('/login') || url.includes('/dashboard')).toBeTruthy();
  });
});

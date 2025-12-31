# Vercel Setup Guide

This guide explains how to deploy and configure the Social Support Portal on Vercel.

## Prerequisites

- A Vercel account ([sign up here](https://vercel.com/signup))
- Your project connected to a Git repository (GitHub, GitLab, or Bitbucket)
- An OpenAI API key ([get one here](https://platform.openai.com/api-keys))

## Step 1: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository
4. Vercel will auto-detect the project settings
5. Click **"Deploy"**

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI globally:

   ```bash
   npm install -g vercel
   ```

2. In your project directory, run:

   ```bash
   vercel
   ```

3. Follow the prompts to link your project

## Step 2: Configure Environment Variables

**This is critical!** The API will not work without the OpenAI API key.

1. Go to your project in the [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** → **Environment Variables**
3. Click **"Add New"**
4. Add the following:

   **Name:** `OPENAI_API_KEY`

   **Value:** Your OpenAI API key (starts with `sk-`)

   **Environments:** Select all three:

   - ☑️ Production
   - ☑️ Preview
   - ☑️ Development

5. Click **"Save"**

## Step 3: Redeploy (if needed)

If you added the environment variable after the initial deployment:

1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger a new deployment

## Step 4: Verify Deployment

1. Visit your deployed site (e.g., `https://your-project.vercel.app`)
2. Navigate to the application form
3. Try using the "Help Me Write" feature
4. If it works, you're all set! 🎉

## Troubleshooting

### API Returns 500 Error

**Problem:** "Missing OPENAI_API_KEY on server"

**Solution:**

- Double-check that `OPENAI_API_KEY` is set in Vercel environment variables
- Make sure it's set for the correct environment (Production/Preview/Development)
- Redeploy after adding the environment variable

### Function Timeout (504 Gateway Timeout)

**Problem:** Request takes longer than 15 seconds

**Solution:**

- The function timeout is set to 15 seconds (optimized for "Help me write" UX)
- The API timeout is also 15 seconds to match
- If you need longer, you can increase `maxDuration` in `vercel.json` (requires Vercel Pro plan for >10 seconds)
- Consider optimizing your OpenAI prompts to reduce response time

### Rate Limit Errors (429)

**Problem:** "Too many requests"

**Solution:**

- The API has a rate limit of 10 requests per minute per IP
- This is intentional to prevent abuse and control costs
- Wait 1 minute and try again
- For production with high traffic, consider upgrading to Vercel KV or Redis for distributed rate limiting

### CORS Errors

**Problem:** CORS errors in browser console

**Solution:**

- CORS is not needed since frontend and API are on the same Vercel project (same origin)
- If you see CORS errors, check that both frontend and API are deployed to the same Vercel project
- Make sure you're calling `/api/generate-text` (not the full OpenAI URL)

## Configuration Files

### `vercel.json`

This file configures the serverless function:

```json
{
  "functions": {
    "api/generate-text.ts": {
      "maxDuration": 30
    }
  }
}
```

- `maxDuration: 30` - Sets function timeout to 30 seconds (max for Hobby plan)
- **Note**: The API timeout is 15 seconds for better UX, but Vercel allows up to 30 seconds

### Environment Variables

**Required:**

- `OPENAI_API_KEY` - Your OpenAI API key

**Optional:**

- None currently

## Rate Limiting

The API includes built-in rate limiting:

- **Limit:** 10 requests per minute per IP address
- **Window:** 60 seconds (sliding window)
- **Storage:** In-memory (resets on cold starts)
- **Retry-After:** Accurate retry timing based on actual reset time

**Limitations:**

- Rate limit resets on cold starts (serverless function restarts)
- Not shared across multiple function instances
- Best-effort for demo/prototype use

**For production with high traffic:**
Consider upgrading to use Vercel KV or Redis for distributed rate limiting that persists across function instances.

## Security Notes

✅ **API key is server-side only** - Never exposed to the client
✅ **Rate limiting** - 10 requests/minute per IP prevents abuse and controls costs
✅ **No CORS wildcard** - Same-origin only (frontend and API on same Vercel project)
✅ **Input validation** - Validates messages, roles, content types, and parameters
✅ **Server-controlled model** - Hardcoded to `gpt-3.5-turbo` (prevents expensive requests)
✅ **Parameter clamping** - `max_tokens` (50-500), `temperature` (0-1)
✅ **Message limits** - Max 10 messages, 4000 chars each
✅ **Error handling** - Proper error responses without exposing internals
✅ **Timeout protection** - 15-second timeout prevents hanging requests

## Next Steps

- Monitor your function usage in the Vercel Dashboard
- Set up alerts for function errors
- Consider adding monitoring/logging (e.g., Sentry)
- Review OpenAI usage and costs regularly

## Support

If you encounter issues:

1. Check the Vercel deployment logs
2. Check browser console for client-side errors
3. Verify environment variables are set correctly
4. Review the [Vercel Documentation](https://vercel.com/docs)


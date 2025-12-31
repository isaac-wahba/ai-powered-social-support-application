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

**Problem:** Request takes longer than 30 seconds

**Solution:**
- The function timeout is set to 30 seconds in `vercel.json`
- If you need longer, you can increase `maxDuration` (requires Vercel Pro plan for >10 seconds)
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
- The API already includes CORS headers
- Make sure you're calling `/api/generate-text` (not the full OpenAI URL)
- Check that your frontend is deployed on the same domain or update CORS headers

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

**For production with high traffic:**
Consider upgrading to use Vercel KV or Redis for distributed rate limiting that persists across function instances.

## Security Notes

✅ **API key is server-side only** - Never exposed to the client
✅ **Rate limiting** - Prevents abuse and controls costs
✅ **CORS configured** - Allows requests from your frontend
✅ **Input validation** - Validates request body before processing
✅ **Error handling** - Proper error responses without exposing internals

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


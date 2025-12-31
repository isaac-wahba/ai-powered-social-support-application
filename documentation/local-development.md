# Local Development Guide

This guide explains how to set up and run the Social Support Portal locally with the API server.

## Overview

The project uses a dual-server setup for local development:

- **Frontend (Vite)**: Runs on `http://localhost:5173`
- **API Server (Express)**: Runs on `http://localhost:8000`
- **Vite Proxy**: Routes `/api/*` requests from frontend to the API server

This setup allows you to:
- Develop the frontend and API locally
- Test the full application flow
- Use the same API endpoints as production (`/api/generate-text`)
- Keep your OpenAI API key server-side only

## Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

This installs all dependencies including:
- Frontend dependencies (React, Material UI, etc.)
- Dev dependencies (Vite, TypeScript, etc.)
- API server dependencies (Express, dotenv, etc.)

### 2. Create `.env.local` File

Create a `.env.local` file in the project root (same directory as `package.json`):

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

**Important:**
- ✅ Use `.env.local` (not `.env`)
- ✅ No `VITE_` prefix (this is server-side only)
- ✅ No quotes around the value
- ✅ No spaces around the `=`
- ✅ Never commit this file to version control

### 3. Start Development Servers

Run both servers concurrently:

```bash
npm run dev
```

This starts:
- **API Server** on `http://localhost:8000`
- **Vite Dev Server** on `http://localhost:5173`

You should see output like:

```
✅ Loaded .env.local from: /path/to/.env.local
✅ Local API server running on http://localhost:8000
✅ Health: http://localhost:8000/api/health
✅ OPENAI_API_KEY loaded (sk-...)
VITE v7.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both API server and Vite dev server concurrently |
| `npm run dev:api` | Start only the API server (port 8000) |
| `npm run dev:vite` | Start only the Vite dev server (port 5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## How It Works

### Architecture

```
┌─────────────────┐
│   Browser       │
│  (localhost:5173)│
└────────┬────────┘
         │
         │ /api/generate-text
         │
┌────────▼────────┐
│  Vite Proxy     │
│  (localhost:5173)│
└────────┬────────┘
         │
         │ Proxies to
         │
┌────────▼────────┐
│  Express Server │
│  (localhost:8000)│
└────────┬────────┘
         │
         │ Calls
         │
┌────────▼────────┐
│  OpenAI API     │
│  (api.openai.com)│
└─────────────────┘
```

### File Structure

```
project/
├── api/
│   └── generate-text.ts    # Vercel serverless function
├── dev-api-server.ts       # Local Express server
├── vite.config.ts          # Vite config with proxy
├── .env.local              # Environment variables (not committed)
└── package.json            # Scripts and dependencies
```

### Vite Proxy Configuration

The `vite.config.ts` includes a proxy that routes all `/api/*` requests to the local API server:

```typescript
server: {
  proxy: {
    "/api": {
      target: "http://localhost:8000",
      changeOrigin: true,
    },
  },
}
```

This means:
- Frontend calls `/api/generate-text` (relative URL)
- Vite proxies it to `http://localhost:8000/api/generate-text`
- No CORS issues (same origin from browser's perspective)

## Testing

### 1. Test Health Endpoint

```bash
curl http://localhost:8000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "hasApiKey": true,
  "apiKeyPrefix": "sk-..."
}
```

### 2. Test API Endpoint Directly

```bash
curl -X POST http://localhost:8000/api/generate-text \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Say hello in one sentence."}
    ],
    "max_tokens": 50,
    "temperature": 0.7
  }'
```

### 3. Test Through Vite Proxy

```bash
curl -X POST http://localhost:5173/api/generate-text \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Say hello"}
    ]
  }'
```

### 4. Test in Browser

1. Open `http://localhost:5173` in your browser
2. Navigate to the application form
3. Click "Help me write" on any AI-enabled field
4. Check browser DevTools → Network tab for `/api/generate-text` requests

## Troubleshooting

### API Server Not Starting

**Problem:** `Cannot find module 'dotenv'` or similar errors

**Solution:**
```bash
npm install
```

### "Missing OPENAI_API_KEY on server"

**Problem:** API key not loaded

**Solutions:**
1. Check that `.env.local` exists in the project root
2. Verify the file contains: `OPENAI_API_KEY=sk-...` (no quotes, no spaces)
3. Restart the dev server after creating/modifying `.env.local`
4. Check console output for dotenv loading messages

### Port Already in Use

**Problem:** Port 8000 or 5173 is already in use

**Solutions:**

For API server (port 8000):
```bash
# Find and kill the process
lsof -ti:8000 | xargs kill -9
```

For Vite (port 5173):
```bash
# Vite will automatically try the next port, or specify one:
npm run dev:vite -- --port 3000
```

### Proxy Not Working

**Problem:** Frontend can't reach API through proxy

**Solutions:**
1. Verify both servers are running (`npm run dev`)
2. Check `vite.config.ts` has the proxy configuration
3. Check browser console for errors
4. Verify the API server is actually running on port 8000

### CORS Errors

**Problem:** CORS errors in browser console

**Solution:**
- The dev server includes CORS middleware
- If you still see CORS errors, check that both servers are running
- Make sure you're accessing the frontend through Vite (not directly opening HTML files)

## Development Workflow

### Making Changes

1. **Frontend changes**: Edit files in `src/` - Vite will hot-reload automatically
2. **API changes**: Edit `api/generate-text.ts` - restart the API server to see changes
3. **Config changes**: Edit `vite.config.ts` or `dev-api-server.ts` - restart both servers

### Debugging

- **Frontend**: Use browser DevTools (F12)
- **API Server**: Check terminal output for logs
- **Network**: Use browser DevTools → Network tab to inspect requests
- **Environment**: Check health endpoint to verify API key is loaded

## Production vs Development

| Aspect | Development | Production (Vercel) |
|--------|-------------|---------------------|
| API Server | Express on port 8000 | Vercel serverless function |
| Frontend | Vite dev server | Static build |
| Environment | `.env.local` | Vercel environment variables |
| API Endpoint | `/api/generate-text` | `/api/generate-text` (same) |
| Proxy | Vite proxy | No proxy needed (same origin) |

The API endpoint path (`/api/generate-text`) is the same in both environments, so your frontend code doesn't need to change.

## Next Steps

- Read the [Setup Guide](setup.md) for initial project setup
- Check the [Development Guide](development.md) for code patterns
- Review the [Vercel Setup Guide](vercel-setup.md) for deployment
- See [Architecture Documentation](architecture.md) for project structure

# Setup & Installation Guide

## Prerequisites

- Node.js 18+
- OpenAI API key (for AI features)

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd social-support-portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

#### Getting an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Give it a name (e.g., "Social Support Portal")
6. Copy the API key (you won't be able to see it again)

#### Setting Up the Environment Variable

Create a `.env` file in the root directory:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

**Important**:

- Never commit the `.env` file to version control
- Replace `your_openai_api_key_here` with your actual OpenAI API key
- The API key starts with `sk-`
- See [Security Guide](security.md) for more information about API key security

### 4. Start Development Server

```bash
npm run dev
```

## Build for Production

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

| Script            | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build         |
| `npm run lint`    | Run ESLint to check code quality |

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. You can also specify a port:

```bash
npm run dev -- --port 3000
```

### Environment Variables Not Loading

- Environment variables must be prefixed with `VITE_` to be accessible in the browser
- Restart the dev server after creating/modifying `.env`

## Next Steps

- Read the [Architecture Guide](architecture.md) to understand the project structure
- Check the [Development Guide](development.md) for how to extend the project
- Review [Security Guide](security.md) for security best practices

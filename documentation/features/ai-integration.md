# AI Integration Feature

## Overview

The AI Integration feature provides intelligent text generation assistance for users filling out the social support application form. It uses OpenAI's GPT-3.5-turbo model to help users write detailed responses for complex text fields, making the application process more accessible and user-friendly.

## Architecture

The AI integration is built with a client-server architecture:

### Client-Side Components

- **`useAITextGeneration`** (`src/hooks/useAITextGeneration.ts`): Core hook that manages AI text generation state and API calls
- **`useAIFieldHandler`** (`src/hooks/useAIFieldHandler.ts`): Higher-level hook that integrates AI generation with form field management
- **`AIFieldWithButton`** (`src/features/application/steps/components/AIFieldWithButton.tsx`): Reusable UI component that combines a textarea with an AI generation button
- **`HelpMeWriteButton`** (`src/features/application/steps/components/HelpMeWriteButton.tsx`): Button component that triggers AI generation

### Server-Side Components

- **`/api/generate-text.ts`**: Vercel serverless function that handles OpenAI API requests
- **`openaiClient.ts`** (`src/services/openaiClient.ts`): Client-side service that communicates with the API endpoint

### Prompt Engineering

- **`promptBuilder.ts`** (`src/services/prompts/promptBuilder.ts`): Orchestrates prompt construction
- **`systemMessages.ts`** (`src/services/prompts/systemMessages.ts`): Defines AI behavior and role
- **`userPrompts.ts`** (`src/services/prompts/userPrompts.ts`): Constructs user-facing prompts
- **`contextBuilder.ts`** (`src/services/prompts/contextBuilder.ts`): Builds form context for AI understanding

## Supported Fields

The AI integration currently supports three text fields in Step 3 of the application:

1. **`currentFinancialSituation`**: Describes the applicant's current financial circumstances
2. **`employmentCircumstances`**: Details about employment status and work situation
3. **`reasonForApplying`**: Explanation of why the applicant is seeking support

## How It Works

### User Flow

1. User navigates to Step 3 (Situation Description) of the application
2. User sees textarea fields with "Help me write" buttons
3. User clicks "Help me write" button for a specific field
4. System collects current form data as context
5. AI generates personalized text based on form context
6. Generated text is automatically inserted into the field
7. User can edit the generated text as needed

### Technical Flow

```
User clicks "Help me write"
  ↓
useAIFieldHandler.handleGenerateAndSet()
  ↓
useAITextGeneration.generateText()
  ↓
openaiClient.generateTextWithAI()
  ↓
POST /api/generate-text
  ↓
API validates request, checks rate limits
  ↓
API calls OpenAI GPT-3.5-turbo
  ↓
Response processed and returned
  ↓
Text inserted into form field via setValue()
```

## Prompt Engineering

### System Messages

The system messages define the AI's role and behavior:

- **English**: Instructs the AI to write in first person, be professional and empathetic, focus on factual details, and avoid greetings/closings
- **Arabic**: Similar instructions in Arabic, emphasizing formal Arabic (Fusha) and first-person perspective

### Context Building

The system builds context from existing form data:

- Personal information (age, gender)
- Family information (marital status, dependents)
- Financial information (employment status, monthly income, housing status)

This context is translated to the target language and included in the prompt to ensure the AI generates relevant, personalized content.

### User Prompts

User prompts are field-specific and include:

- Clear instructions about what to write
- The built context from form data
- Language-specific formatting

## Security & Rate Limiting

### Rate Limiting

The API endpoint implements rate limiting to prevent abuse:

- **Limit**: 10 requests per minute per IP address
- **Window**: 1 minute rolling window
- **Storage**: In-memory (for demo; production should use shared store like Vercel KV)
- **Response**: Returns 429 status with `Retry-After` header

### Input Validation

The API validates all inputs:

- Message count limit (max 10 messages)
- Message length limit (max 4000 characters per message)
- Valid role checking (system, user, assistant)
- Token limits (50-500 tokens, clamped)
- Temperature limits (0-1, clamped)

### Security Measures

- API key stored server-side only (environment variable)
- Server-controlled model selection (client cannot choose model)
- Request timeout (15 seconds)
- CORS not needed (same-origin requests)

## Error Handling

The system handles various error scenarios:

### Client-Side Errors

- **Network errors**: Detected and shown to user
- **Timeout errors**: 15-second timeout with user-friendly message
- **API errors**: Parsed and displayed with context
- **Rate limit errors**: Shows retry time to user

### Server-Side Errors

- **401 Unauthorized**: Invalid API key
- **429 Too Many Requests**: Rate limit exceeded
- **408 Request Timeout**: Request took too long
- **500 Server Error**: Generic server errors

All errors are caught and displayed to users with actionable messages.

## Configuration

### Environment Variables

- **`OPENAI_API_KEY`**: Required on server. Must be set in Vercel environment variables.

### API Configuration

- **Model**: `gpt-3.5-turbo` (hardcoded on server)
- **Max Tokens**: 500 (clamped between 50-500)
- **Temperature**: 0.7 (clamped between 0-1)
- **Timeout**: 15 seconds

## Internationalization

The AI integration fully supports both English and Arabic:

- System messages are language-specific
- User prompts are translated
- Form context is translated to target language
- Generated text matches the user's selected language

## Usage Example

```typescript
// In a component
const { loading, error, handleGenerateAndSet, clearError } =
  useAIFieldHandler();

// Generate text for a field
await handleGenerateAndSet("currentFinancialSituation");

// The generated text is automatically set in the form field
```

## Future Improvements

Potential enhancements for the AI integration:

1. **Shared Rate Limiting**: Use Vercel KV or Upstash for distributed rate limiting
2. **Streaming Responses**: Stream AI responses for better UX
3. **Field-Specific Models**: Use different models or parameters for different fields
4. **Context Caching**: Cache form context to reduce prompt size
5. **User Feedback**: Allow users to regenerate or refine AI suggestions
6. **Cost Optimization**: Implement token usage tracking and optimization

## Related Documentation

- [Application Feature](./application-feature.md) - How AI integration is used in the application wizard
- [Security Documentation](../security.md) - Overall security considerations
- [Architecture Documentation](../architecture.md) - System architecture overview

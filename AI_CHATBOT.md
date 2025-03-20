# AI Chatbot Integration Guide

## Overview

The website includes an AI-powered chat assistant that helps visitors with information about LB Computer Help services, booking appointments, and basic technical advice. The chatbot appears as a floating button in the bottom-right corner of all pages.

## Configuration

The AI chatbot can be configured using environment variables. Here's how:

### 1. Setting up environment variables

Create a `.env.local` file in the root directory with the following variables:

```
# AI Provider API Keys
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Which AI provider to use: "openai" or "anthropic"
AI_PROVIDER=openai

# Model selection
OPENAI_MODEL=gpt-4o
```

### 2. Choosing an AI provider

You can choose between two AI providers:

- **OpenAI** (GPT models)
- **Anthropic** (Claude models)

Set the `AI_PROVIDER` variable to either `openai` or `anthropic` to select your preferred provider.

### 3. Selecting a model

#### For OpenAI
Set the `OPENAI_MODEL` variable to one of:
- `gpt-4o` (newest, most powerful)
- `gpt-4` (powerful but more expensive)
- `gpt-3.5-turbo` (faster, less expensive)

#### For Anthropic
The system currently uses `claude-3-haiku-20240307` by default, which is Claude's fastest model.

### 4. Deploying to Vercel

When deploying to Vercel, add these environment variables in the Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each of the variables from your .env.local file
4. Redeploy your application

## How It Works

1. The chatbot appears as a floating button in the bottom corner of every page
2. When a user sends a message, it's sent to `/api/chat` API route
3. The API route forwards the request to the selected AI provider with context about LB Computer Help
4. The AI generates a response based on company information and the user's query
5. Response is sent back to the user

## Cost Management

The system includes built-in cost management features:

1. **Development Mode Protection**: In development environments, the system uses mock responses instead of making actual API calls
2. **Token Limits**: Responses are limited to 300-500 tokens to control costs
3. **Concise Instructions**: The AI is instructed to keep responses under 3 sentences when possible

## Customizing Company Information

The company context is defined in the `/src/app/api/chat/route.ts` file. You can modify the `COMPANY_CONTEXT` variable to update information about:

- Services and pricing
- Business hours
- Contact information
- Booking details
- Location information

## Troubleshooting

If the chatbot isn't working correctly:

1. Check the browser console for errors
2. Verify your API keys are valid
3. Make sure the selected model is available on your account
4. Check Vercel logs for any API-related errors
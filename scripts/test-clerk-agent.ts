#!/usr/bin/env ts-node

/**
 * Test script for Clerk Agent Toolkit integration
 * 
 * This demonstrates how to use the Clerk Agent Toolkit with AI agents
 * for user and organization management in your Obulo app.
 * 
 * Usage:
 *   CLERK_SECRET_KEY=sk_test_xxx npx ts-node scripts/test-clerk-agent.ts
 */

import { createClerkToolkit } from '@clerk/agent-toolkit/ai-sdk'

async function testClerkAgentToolkit() {
  const secretKey = process.env.CLERK_SECRET_KEY

  if (!secretKey) {
    console.error('❌ CLERK_SECRET_KEY environment variable is required')
    console.log('💡 Get your secret key from: https://dashboard.clerk.com')
    process.exit(1)
  }

  console.log('🚀 Testing Clerk Agent Toolkit...')
  
  try {
    // Initialize the toolkit
    const toolkit = await createClerkToolkit()

    console.log('✅ Clerk Agent Toolkit initialized successfully!')
    
    // Get available tools
    const userTools = toolkit.users()
    const orgTools = toolkit.organizations()
    
    console.log('📊 Available user tools:', Object.keys(userTools))
    console.log('📊 Available organization tools:', Object.keys(orgTools))
    
    console.log(`
🎯 Ready for AI agent workflows!

Example usage in your app:

\`\`\`typescript
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createClerkToolkit } from '@clerk/agent-toolkit/ai-sdk'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const toolkit = await createClerkToolkit()

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    tools: {
      ...toolkit.users(),
      ...toolkit.organizations(),
    },
  })

  return result.toDataStreamResponse()
}
\`\`\`

🔧 To start the local MCP server:
   pnpm clerk:mcp ${secretKey}
`)

  } catch (error) {
    console.error('❌ Error testing Clerk Agent Toolkit:', error)
    process.exit(1)
  }
}

// Run the test
testClerkAgentToolkit() 
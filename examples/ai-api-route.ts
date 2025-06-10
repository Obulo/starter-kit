/**
 * Example AI API Route with Clerk Agent Toolkit
 * 
 * This shows how to integrate the Clerk Agent Toolkit directly into your app
 * instead of using MCP. Perfect for development in Cursor.
 * 
 * Usage: POST /api/ai with { "messages": [...], "action": "user_query" }
 */

import { createClerkToolkit } from '@clerk/agent-toolkit/ai-sdk'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai' // You'd need to install this

export async function POST(req: Request) {
  try {
    const { messages, action } = await req.json()

    // Initialize Clerk toolkit
    const toolkit = await createClerkToolkit()

    // Choose tools based on the action
    let tools = {}
    
    switch (action) {
      case 'user_management':
        tools = toolkit.users()
        break
      case 'org_management':
        tools = toolkit.organizations()
        break
      case 'full_access':
        tools = {
          ...toolkit.users(),
          ...toolkit.organizations(),
        }
        break
      default:
        tools = toolkit.allTools()
    }

    // Stream response with AI
    const result = streamText({
      model: openai('gpt-4o'),
      messages,
      tools,
      system: `You are an AI assistant for the Obulo platform. You have access to Clerk user and organization management tools. 
      
      Current workspace context: You're helping manage users and organizations for this workspace.
      
      Available actions:
      - User management: Get, update, create users
      - Organization management: Create, update, delete organizations and memberships
      - Invitation management: Send and manage invitations
      
      Always be helpful and provide clear explanations of what actions you're taking.`,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('AI API Error:', error)
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
} 
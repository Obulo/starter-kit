# Using Clerk Agent Toolkit in Cursor

Instead of using MCP with Claude Desktop, you can use the Clerk Agent Toolkit directly in your development workflow with Cursor.

## 🎯 Why This Approach is Better

- ✅ **Direct integration** in your codebase
- ✅ **Full IntelliSense** and type safety in Cursor
- ✅ **No external dependencies** (no Claude Desktop needed)
- ✅ **Better debugging** with full stack traces
- ✅ **Integrated development** workflow

## 🛠️ Development Tools

### Quick Testing Commands

```bash
# Test basic connection
CLERK_SECRET_KEY=sk_test_your_key pnpm test:clerk

# Interactive tool testing
CLERK_SECRET_KEY=sk_test_your_key pnpm clerk:tools help
CLERK_SECRET_KEY=sk_test_your_key pnpm clerk:tools tools
CLERK_SECRET_KEY=sk_test_your_key pnpm clerk:tools list-users
CLERK_SECRET_KEY=sk_test_your_key pnpm clerk:tools create-org
```

### Available Commands

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `tools` | List all 19 Clerk tools |
| `list-users` | List users in your Clerk instance |
| `list-orgs` | List organizations |
| `get-user <id>` | Get specific user details |
| `create-org` | Create a test organization |

## 🚀 Integration in Your App

### 1. Direct Function Calls

```typescript
import { createClerkToolkit } from '@clerk/agent-toolkit/ai-sdk'

async function manageUsers() {
  const toolkit = await createClerkToolkit()
  const userTools = toolkit.users()
  
  // Get user count
  const count = await userTools.getUserCount.execute({})
  console.log(`Total users: ${count}`)
  
  // Get specific user
  const user = await userTools.getUser.execute({ userId: 'user_123' })
  console.log('User details:', user)
}
```

### 2. React Hook (For Frontend)

```typescript
import { useState, useEffect } from 'react'
import { createClerkToolkit } from '@clerk/agent-toolkit/ai-sdk'

export function useClerkTools() {
  const [toolkit, setToolkit] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function initToolkit() {
      try {
        const tk = await createClerkToolkit()
        setToolkit(tk)
      } catch (error) {
        console.error('Failed to initialize Clerk toolkit:', error)
      } finally {
        setLoading(false)
      }
    }
    
    initToolkit()
  }, [])

  return { toolkit, loading }
}
```

### 3. API Route Integration

```typescript
// pages/api/admin/users.ts
import { createClerkToolkit } from '@clerk/agent-toolkit/ai-sdk'

export default async function handler(req, res) {
  const toolkit = await createClerkToolkit()
  const userTools = toolkit.users()
  
  switch (req.method) {
    case 'GET':
      const count = await userTools.getUserCount.execute({})
      res.json({ userCount: count })
      break
      
    case 'POST':
      const { userId, metadata } = req.body
      const result = await userTools.updateUserPublicMetadata.execute({
        userId,
        publicMetadata: metadata
      })
      res.json(result)
      break
      
    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
}
```

## 🧠 AI Integration Patterns

### Pattern 1: Contextual AI Assistant

```typescript
import { createClerkToolkit } from '@clerk/agent-toolkit/ai-sdk'
import { streamText } from 'ai'

async function createWorkspaceAI(messages) {
  const toolkit = await createClerkToolkit()
  
  return streamText({
    model: openai('gpt-4o'),
    messages,
    tools: {
      // Only provide relevant tools for the context
      ...toolkit.users(),
      ...toolkit.organizations(),
    },
    system: `You are an AI assistant for workspace management.
    You can help with user and organization management tasks.`
  })
}
```

### Pattern 2: Role-Based Tool Access

```typescript
function getToolsForRole(toolkit, userRole) {
  switch (userRole) {
    case 'owner':
      return {
        ...toolkit.users(),
        ...toolkit.organizations(),
      }
    case 'admin':
      return {
        ...toolkit.users(),
        getOrganization: toolkit.organizations().getOrganization,
        updateOrganization: toolkit.organizations().updateOrganization,
      }
    case 'member':
      return {
        getUser: toolkit.users().getUser,
        updateUser: toolkit.users().updateUser,
      }
    default:
      return {}
  }
}
```

## 🔧 Debugging Tips

### 1. Tool Execution Logging

```typescript
const toolkit = await createClerkToolkit()
const tools = toolkit.users()

// Wrap tool execution with logging
async function executeWithLogging(tool, params) {
  console.log(`Executing ${tool.name} with:`, params)
  try {
    const result = await tool.execute(params)
    console.log(`Success:`, result)
    return result
  } catch (error) {
    console.error(`Error in ${tool.name}:`, error)
    throw error
  }
}
```

### 2. Error Handling

```typescript
try {
  const result = await userTools.getUser.execute({ userId })
  return result
} catch (error) {
  if (error.code === 'user_not_found') {
    return { error: 'User not found' }
  }
  throw error
}
```

## 🎯 MCP vs Direct Integration

| Feature | MCP (Claude Desktop) | Direct Integration (Cursor) |
|---------|---------------------|----------------------------|
| Development | External tool | Built into your app |
| Debugging | Limited | Full stack traces |
| Type Safety | None | Full TypeScript support |
| IntelliSense | None | Complete in Cursor |
| Customization | Limited | Full control |
| Deployment | Not needed | Part of your app |

## 🚀 Next Steps

1. **Test the tools**: `pnpm clerk:tools help`
2. **Build API routes** with the toolkit
3. **Create React components** that use the tools
4. **Add AI features** to your Obulo app
5. **Deploy** with full integration

This approach gives you much more control and better development experience than MCP! 
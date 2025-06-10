#!/usr/bin/env node

/**
 * Development Tool for Testing Clerk Agent Toolkit
 * 
 * This allows you to test Clerk tools directly in Cursor during development
 * instead of needing Claude Desktop or MCP setup.
 * 
 * Usage:
 *   CLERK_SECRET_KEY=sk_test_xxx node scripts/test-clerk-tools.js [command]
 * 
 * Commands:
 *   list-users      - List all users in your Clerk instance
 *   list-orgs       - List all organizations
 *   get-user <id>   - Get specific user details
 *   create-org      - Create a test organization
 *   help            - Show all available tools
 */

async function main() {
  const secretKey = process.env.CLERK_SECRET_KEY
  const command = process.argv[2] || 'help'
  const arg = process.argv[3]

  if (!secretKey) {
    console.error('❌ CLERK_SECRET_KEY environment variable is required')
    console.log('💡 Usage: CLERK_SECRET_KEY=sk_test_xxx node scripts/test-clerk-tools.js [command]')
    process.exit(1)
  }

  try {
    // Import the toolkit
    const { createClerkToolkit } = await import('@clerk/agent-toolkit/ai-sdk')
    const toolkit = await createClerkToolkit()

    console.log(`🔧 Executing command: ${command}`)
    console.log('─'.repeat(50))

    switch (command) {
      case 'help':
        showHelp(toolkit)
        break

      case 'list-users':
        await listUsers(toolkit)
        break

      case 'list-orgs':
        await listOrganizations(toolkit)
        break

      case 'get-user':
        if (!arg) {
          console.error('❌ User ID required: node scripts/test-clerk-tools.js get-user <user_id>')
          process.exit(1)
        }
        await getUser(toolkit, arg)
        break

      case 'create-org':
        await createTestOrganization(toolkit)
        break

      case 'tools':
        listAllTools(toolkit)
        break

      default:
        console.error(`❌ Unknown command: ${command}`)
        showHelp(toolkit)
        process.exit(1)
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

function showHelp(toolkit) {
  const userTools = Object.keys(toolkit.users())
  const orgTools = Object.keys(toolkit.organizations())
  
  console.log('📚 Available Commands:')
  console.log('  help            - Show this help')
  console.log('  list-users      - List all users')
  console.log('  list-orgs       - List all organizations')
  console.log('  get-user <id>   - Get user details')
  console.log('  create-org      - Create test organization')
  console.log('  tools           - List all available tools')
  console.log('')
  console.log('🔧 Available Clerk Tools:')
  console.log(`  User Tools (${userTools.length}):`, userTools.join(', '))
  console.log(`  Org Tools (${orgTools.length}):`, orgTools.join(', '))
}

async function listUsers(toolkit) {
  try {
    const tools = toolkit.users()
    
    // Get user count first
    if (tools.getUserCount) {
      const countResult = await tools.getUserCount.execute({})
      console.log(`👥 Total Users: ${countResult.count || 'Unknown'}`)
      console.log('')
    }

    console.log('📋 Note: Use Clerk Dashboard to view detailed user list')
    console.log('🔗 https://dashboard.clerk.com/users')
    
  } catch (error) {
    console.error('❌ Error listing users:', error.message)
  }
}

async function listOrganizations(toolkit) {
  try {
    console.log('🏢 Organizations:')
    console.log('📋 Note: Use Clerk Dashboard to view detailed organization list')
    console.log('🔗 https://dashboard.clerk.com/organizations')
    
  } catch (error) {
    console.error('❌ Error listing organizations:', error.message)
  }
}

async function getUser(toolkit, userId) {
  try {
    const tools = toolkit.users()
    
    if (tools.getUser) {
      console.log(`🔍 Getting user: ${userId}`)
      const result = await tools.getUser.execute({ userId })
      console.log('📋 User Details:', JSON.stringify(result, null, 2))
    } else {
      console.log('❌ getUser tool not available')
    }
    
  } catch (error) {
    console.error('❌ Error getting user:', error.message)
  }
}

async function createTestOrganization(toolkit) {
  try {
    const tools = toolkit.organizations()
    
    if (tools.createOrganization) {
      const orgName = `Test Org ${Date.now()}`
      console.log(`🏢 Creating organization: ${orgName}`)
      
      const result = await tools.createOrganization.execute({
        name: orgName,
        slug: orgName.toLowerCase().replace(/\s+/g, '-')
      })
      
      console.log('✅ Organization Created:', JSON.stringify(result, null, 2))
    } else {
      console.log('❌ createOrganization tool not available')
    }
    
  } catch (error) {
    console.error('❌ Error creating organization:', error.message)
  }
}

function listAllTools(toolkit) {
  const allTools = toolkit.allTools()
  console.log('🛠️ All Available Tools:')
  console.log('─'.repeat(30))
  
  Object.keys(allTools).forEach((toolName, index) => {
    console.log(`${index + 1}. ${toolName}`)
  })
  
  console.log('')
  console.log(`📊 Total: ${Object.keys(allTools).length} tools available`)
}

// Run the script
main() 
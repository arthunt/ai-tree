/**
 * Test Supabase Connection
 * 
 * Run: npx tsx scripts/test-supabase.ts
 */

// Load environment variables
import 'dotenv/config'

async function testConnection() {
  console.log('\n🔍 Testing Supabase Connection...\n')
  
  // Check environment variables
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  console.log('Environment Variables:')
  console.log(`  NEXT_PUBLIC_SUPABASE_URL: ${url ? '✅ Set' : '❌ Missing'}`)
  console.log(`  NEXT_PUBLIC_SUPABASE_ANON_KEY: ${anonKey ? '✅ Set (' + anonKey.substring(0, 20) + '...)' : '❌ Missing'}`)
  console.log(`  SUPABASE_SERVICE_ROLE_KEY: ${serviceKey ? '✅ Set' : '❌ Missing (optional for client tests)'}`)
  console.log()
  
  if (!url || !anonKey) {
    console.error('❌ Missing required environment variables!')
    console.error('   Please check your .env.local file.')
    process.exit(1)
  }
  
  // Dynamic import to avoid issues with env vars
  const { createClient } = await import('@supabase/supabase-js')
  
  const supabase = createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  })
  
  // Test 1: Basic connection - list tables
  console.log('Test 1: Checking database tables...')
  try {
    const { data: tables, error } = await supabase
      .from('learning_sessions')
      .select('id')
      .limit(1)
    
    if (error) {
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        console.log('  ⚠️  Table "learning_sessions" not found.')
        console.log('     Run the schema.sql in Supabase SQL Editor first!')
      } else {
        throw error
      }
    } else {
      console.log('  ✅ Connected to database!')
      console.log(`     Found ${tables?.length || 0} existing sessions`)
    }
  } catch (err: any) {
    console.error('  ❌ Connection failed:', err.message)
    process.exit(1)
  }
  
  // Test 2: Create test session
  console.log('\nTest 2: Creating test session...')
  const testToken = 'test-' + Date.now()
  
  try {
    const { data: session, error } = await supabase
      .from('learning_sessions')
      .insert({
        session_token: testToken,
        locale: 'et'
      })
      .select()
      .single()
    
    if (error) {
      console.log('  ⚠️  Insert failed:', error.message)
      console.log('     This might be expected if schema is not set up.')
    } else {
      console.log('  ✅ Test session created!')
      console.log(`     ID: ${session.id}`)
      console.log(`     Token: ${session.session_token}`)
      
      // Cleanup
      console.log('\nCleaning up test data...')
      await supabase
        .from('learning_sessions')
        .delete()
        .eq('id', session.id)
      console.log('  🧹 Test session deleted')
    }
  } catch (err: any) {
    console.log('  ⚠️  Test skipped:', err.message)
  }
  
  // Test 3: Check RPC function
  console.log('\nTest 3: Testing get_or_create_session function...')
  try {
    const { data, error } = await supabase
      .rpc('get_or_create_session', {
        p_session_token: 'rpc-test-' + Date.now(),
        p_locale: 'et'
      })
    
    if (error) {
      console.log('  ⚠️  RPC function not available:', error.message)
      console.log('     This is expected if schema.sql hasn\'t been run.')
    } else {
      console.log('  ✅ RPC function works!')
      
      // Cleanup
      if (data?.[0]?.id) {
        await supabase
          .from('learning_sessions')
          .delete()
          .eq('id', data[0].id)
        console.log('  🧹 RPC test session deleted')
      }
    }
  } catch (err: any) {
    console.log('  ⚠️  RPC test skipped:', err.message)
  }
  
  console.log('\n' + '='.repeat(50))
  console.log('🎉 Supabase connection test complete!')
  console.log('='.repeat(50) + '\n')
}

testConnection().catch(console.error)

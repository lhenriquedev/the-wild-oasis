import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://ysudomlmxasvrkzkwxbg.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzdWRvbWxteGFzdnJremt3eGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwNTA0NTIsImV4cCI6MjAwNzYyNjQ1Mn0.-ZoLqQ0pxkLVEwdQup8IDYNLPbViqofc8oZ6zyzNsCA'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { createServerClient } from '@supabase/ssr'

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
  
  const {data:{session}}=await supabase.auth.getSession();
  
  if(!session) {
    redirect('/login');
  }
  return (
    <div className='text-5xl text white bg-black text-center'>Hey there {session?.user?.email} you are signed in</div>
  )
}

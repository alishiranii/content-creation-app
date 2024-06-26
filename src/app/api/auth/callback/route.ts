import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { serverSupabase } from '@/lib'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = cookies();
    const supabase = serverSupabase(cookieStore);
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      await supabase.from("billing").insert([{}]);
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
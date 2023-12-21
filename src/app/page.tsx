import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { createServerClient } from "@supabase/ssr";
import Sidebar from "@/components/Sidebar";
import MainInput from "@/components/MainInput";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="bg-[#131619] min-h-screen w-full">
      <div className="flex">
        <Sidebar user={session.user.email} />
        <div className="w-full">
          <MainInput/>
        </div>
      </div>
    </div>
  );
}

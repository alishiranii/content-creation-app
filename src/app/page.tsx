import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Sidebar from "@/components/main/Sidebar";
import MainInput from "@/components/main/MainInput";
import SidebarBtn from "@/components/main/SidebarBtn";
import { serverSupabase } from "@/lib";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = serverSupabase(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="bg-[#131619] min-h-screen w-full">
      <div className="flex lg:min-h-full min-h-screen">
        <SidebarBtn />
        <div className="drawer-overlay"></div>
        <Sidebar user={session.user.email} />
        <MainInput />
      </div>
    </div>
  );
}

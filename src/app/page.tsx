import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Sidebar from "@/components/main/sidebar/Sidebar";
import MainInput from "@/components/main/content/MainInput";
import SidebarBtn from "@/components/main/sidebar/SidebarBtn";
import { serverSupabase } from "@/lib";
import TopBar from "@/components/main/content/TopBar";

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
        <div className="drawer-overlay"></div>
        <Sidebar user={session.user.email} />
        <div className="flex relative flex-col w-full">
          <div className="flex absolute top-0 w-full items-center justify-between bg-[#0D0F10] lg:rounded-lg lg:mt-3">
            <TopBar />
            <SidebarBtn />
          </div>
          <div className="absolute bottom-2 w-full">
            <MainInput />
          </div>
        </div>
      </div>
    </div>
  );
}

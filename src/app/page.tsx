import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "@/components/main/sidebar/Sidebar";
import MainInput from "@/components/main/content/MainInput";
import { serverSupabase } from "@/lib";
import TopBar from "@/components/main/content/TopBar";
import Messages from "@/components/main/content/Messages";
import Create from "@/components/main/content/Create";


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
    <div className="bg-[#131619] min-h-[100svh] w-full">
      <div className="flex lg:min-h-full min-h-screen">
        <div className="drawer-overlay"></div>
        <Sidebar user={session.user.email}/>
        <div className="flex relative flex-col justify-between w-full">
          <TopBar />
          <Messages />
          <Create />
          <div className=" bottom-2 w-full">
            <MainInput />
          </div>
        </div>
      </div>
    </div>
  );
}

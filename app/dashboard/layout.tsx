import SidePannel from "@/components/dashboard/SidePannel";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";


export default async function DashboardLayout({
    children, 
}:Readonly<{
    children: React.ReactNode
}>) {

    const cookie = await cookies();
    const startupdata = cookie.get("startupdata");

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {startupdata?.value ? (
       <>
        <SidePannel />
        <div className={cn("flex-1 flex flex-col min-h-screen transition-all md:ml-56 duration-200")}>
          {/* <Header /> */}
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
       </>
      ) : (
        children
      )}
    </div>
  )
}
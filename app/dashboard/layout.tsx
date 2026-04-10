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
    const hasStartupData = !!startupdata?.value;

    return (
        <div className="min-h-screen flex flex-col bg-blue-50">
            <div className={cn(!hasStartupData && "hidden")}>
                <SidePannel />
            </div>
            <div className={cn(
                "flex-1 flex flex-col min-h-screen transition-all duration-200",
                hasStartupData && "md:ml-56"
            )}>
                <main className={cn("flex-1", hasStartupData && "p-4")}>
                    {children}
                </main>
            </div>
        </div>
    );
}
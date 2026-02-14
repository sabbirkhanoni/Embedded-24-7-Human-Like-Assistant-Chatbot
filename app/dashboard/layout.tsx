import { cookies } from "next/headers";


export default async function DashboardLayout({
    children,
}:Readonly<{
    children: React.ReactNode
}>) {

    const cookie = await cookies();
    const metadata = cookie.get("metadata");

  return (
    <div className="min-h-screen flex flex-col from-[#050509] via-[#1a1a1a] to-[#050509] bg-gradient-to-r">
      {metadata?.value ? (
       <>
        {children}
       </>
      ) : (
        children
      )}
    </div>
  )
}
"use client";
import { useUser } from "@/hooks/use-user";
import axios from "axios";
import {
  icons,
  LayoutDashboardIcon,
  LayoutTemplate,
  MessageCircle,
  Settings,
  Settings2Icon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const ELEMENTS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
  { label: "Prompts", href: "/dashboard/prompts", icon: icons.Pencil },
  { label: "Templates", href: "/dashboard/templates", icon: LayoutTemplate },
  { label: "Customization", href: "/dashboard/customization", icon: Settings2Icon },
  { label: "Chats", href: "/dashboard/chats", icon: MessageCircle },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const SidePannel = () => {
  const currentPath = usePathname();
  const { email } = useUser();
  const [startupData, setStartupData] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStartupData();
  }, []);

  const getStartupData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/startup/get");
      setStartupData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="bg-gradient-to-r from-[#0a1079] to-[#0d5df3] w-56 border border-gray-700 fixed top-0 left-0 h-full z-10 p-5">
      <nav className="mt-2 flex flex-col justify-between h-full">
        <div>
          <Link
            href={"/"}
            className="text-2xl font-bold text-white flex items-center justify-center"
          >
            <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-[#ebebed] rounded-full animate-pulse"></div>
            </div>
            <span className="text-sm font-medium ml-2">PAI ChatBot</span>
          </Link>

          <div>
            {ELEMENTS.map((element) => {
              const currentVisible = currentPath === element.href;
              return (
                <Link
                  key={element.href}
                  href={element.href}
                  className={`flex items-center gap-2 text-white hover:text-white hover:bg-gray-900 transition-colors duration-200 mt-2 p-2 rounded-lg ${currentVisible ? "bg-gray-900 text-gray-900 " : ""}`}
                >
                  <element.icon size={16} />
                  {element.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="">
          <div className="w-full">
            <div className="border my-1 w-full border-gray-400"></div>
            <div className="text-black flex items-center justify-center w-full">
              {loading ? (
                <div className="flex items-center gap-2 text-gray-700 mt-2 p-2 rounded-lg animate-pulse">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-300 mt-2 px-5 py-2 border border-gray-600 rounded-lg bg-gray-900">
                  {startupData && (
                    <div>
                      <div>
                        <Link
                          href={"/"}
                          className="text-2xl font-bold text-white flex items-center justify-center"
                        >
                          <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-[#ebebed] rounded-full animate-pulse"></div>
                          </div>
                          <span className="text-sm font-medium ml-2">
                            {startupData.data.businessName}
                          </span>
                        </Link>
                      </div>
                      <p className="text-xs font-medium">{email}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default SidePannel;

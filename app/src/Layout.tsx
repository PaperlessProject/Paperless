import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import ConvertInterface from "./components/ToolInterface";
export type NavItems = Array<{ title: string; icon: string; path: string }>;
export interface Children {
  children: ReactNode;
}

export default function Layout({ children }: Children) {
  return (
    <div className="flex">
      <Sidebar></Sidebar>

      <div className="flex items-center justify-center w-full">{children}</div>
    </div>
  );
}

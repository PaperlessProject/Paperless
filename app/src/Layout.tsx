import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
export type NavItems = Array<{ title: string; icon: string; path: string }>;
export interface Children {
  children: ReactNode;
}

export default function Layout({ children }: Children) {
  const sidebarItems: NavItems = [
    { title: "Convert to PDF", icon: "", path: "/" },
    { title: "Convert from PDF", icon: "", path: "/fromPDF" },
    { title: "Compress", icon: "", path: "/toPDF" },
  ] as const;

  return (
    <div className="flex">
      <div className="" >
        <Sidebar></Sidebar>
      </div>
      {children}
    </div>
  );
}

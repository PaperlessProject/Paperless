import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
export type NavItems = Array<{ title: string; icon: string; path: string }>;
export interface Children {
  children: ReactNode;
}

export default function Layout({ children }: Children) {


  return (
    <div className="flex ">
      <div>
        <Sidebar></Sidebar>
      </div>
      <div>{children}</div>
    </div>
  );
}

import { NavLink, useLocation } from "react-router-dom";
import { NavItems } from "../Layout";

interface Props {
  items: NavItems;
}

export default function Sidebar() {
  const items: NavItems = [
    { title: "Convert to PDF", icon: "", path: "/" },
    { title: "Convert from PDF", icon: "", path: "/fromPDF" },
    { title: "Compress", icon: "", path: "/compress" },
  ] as const;

  const location = useLocation();
  const path = location.pathname;
  console.log(path);

  return (
    <div>
      <nav className="bg-slate-50 h-screen p-5 w-[300px]">
        <div className="flex gap-2 items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-red-600">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
            />
          </svg>

          <h1 className="text-2xl ">Paperless</h1>
        </div>

        <ul className="flex flex-col gap-5 mt-8">
          {items.map((item, index) => {
            return (
              <NavLink key={index} to={item.path}>
                <li
                  className={`flex transition-all gap-2 items-center ${
                    path === item.path
                      ? "text-red-600 bg-white p-2 rounded-md"
                      : "text-dash-gray"
                  } cursor-pointer`}>
                  <div>{item.icon}</div>
                  <p className="font-medium">
                    {item.title.slice(0, 1).toUpperCase() + item.title.slice(1)}
                  </p>
                </li>
              </NavLink>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="w-full min-h-screen h-max p-4 flex flex-col bg-zinc-900">
      <Header />
      <Outlet />
    </div>
  );
}

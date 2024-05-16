import { Outlet } from "@remix-run/react";
import { Header } from "~/components";

const HomeLayout = () => {
  return (
    <div className="items-center flex flex-col">
      <Header />
      <div className="flex flex-col container place-content-center">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;

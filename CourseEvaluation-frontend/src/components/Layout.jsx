import React from "react";
import NavbarCustom from "./NavbarCustom";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div >
      <NavbarCustom />
     
     <main > 
      <Outlet/>
      </main>
    </div>
  );
};

export default Layout;

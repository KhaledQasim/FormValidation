import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

import { theme } from "../../helper/theme";
import { effect } from "@preact/signals-react";

effect(() => {
  if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "");
  }
  theme.value = localStorage.getItem("theme");
});

function Layout() {
  return (
    // the browser will first apply the min-h-[100vh] property then it will apply the min-h-[100svh] property if the screen is on a phone, since min-h-[100svh] works better on a phone
    <div className="flex flex-col min-h-[100vh] " data-theme={theme.value}>
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;

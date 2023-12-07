import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"


function Layout(){
    return(
        // the browser will first apply the min-h-[100vh] property then it will apply the min-h-[100svh] property if the screen is on a phone, since min-h-[100svh] works better on a phone
        <div className="flex flex-col min-h-[100vh] min-h-[100svh]">
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    )
}

export default Layout;
import { effect } from "@preact/signals-react";
import { themeChange } from "theme-change";

effect(() => {
    themeChange(true);
    // 👆 false parameter is required for react project
  }, []);

function Navbar() {

  return (
    <>
      <button data-toggle-theme="dark,light" >change theme</button>

      <div className="text-4xl">Navbar</div>
    </>
  );
}

export default Navbar;

// Set to a specific theme
// <button data-set-theme="retro" >retro</button>

import { signal } from "@preact/signals-react";
import axios from "axios";
const logged = signal("");
const backend_url = import.meta.env.VITE_BACKEND_URL;

// effect(() => {
//   logout();
// });

function logout() {
  axios
    .get(backend_url + "auth/logout", { withCredentials: true })
    .then((res) => {
      if (res.status === 200 ) {
        logged.value = false;
        localStorage.setItem("logged","false")
        window.location.href = "/";
        window.location.reload();
        
      }
    });
  logged.value = false;
}


export { logout };

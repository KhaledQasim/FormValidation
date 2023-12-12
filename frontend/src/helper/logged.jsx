import { signal, effect } from "@preact/signals-react";
import axios from "axios";
const logged = signal("");
const backend_url = import.meta.env.VITE_BACKEND_URL;
const userData = signal({
  username: "",
  id: "",
});

effect(() => {
    userUpdate();
});

function userUpdate() {
  if (localStorage.getItem("logged") === null) {
    localStorage.setItem("logged", "");
  }

  console.log("logged axios start");
  axios
    .get(backend_url + "cookie-jwt-validation", { withCredentials: true })
    .then((res) => {
      if (res.status === 200) {
        // userData.value.username = res.data.username;
        // userData.value.id = res.data.id;

        userData.value.id = res.data.User.id;
        userData.value.username = res.data.User.username;

        logged.value = true;
        localStorage.setItem("logged", true);
      } else {
        logged.value = false;
        localStorage.setItem("logged", false);
      }
    })
    .catch((err) => {
      logged.value = false;
      localStorage.setItem("logged", false);

      console.log(err);
    });
}

logged.value = localStorage.getItem("logged");

export { logged, userData , userUpdate};

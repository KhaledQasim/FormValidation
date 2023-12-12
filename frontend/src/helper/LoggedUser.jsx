import { useAtom } from "jotai";
import { loggedUser } from "../main";
import axios from "axios";


function LoggedUser() {
  const [user, setUser] = useAtom(loggedUser);
  
  // eslint-disable-next-line no-unused-vars

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  axios
    .get(backend_url + "cookie-jwt-validation", { withCredentials: true })
    .then((res) => {
      if (res.status === 200) {
        setUser(true);
      } else {
        setUser(false);
      }
    });

  console.log(user);
}

export { LoggedUser };

import { signal , effect } from "@preact/signals-react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { LoggedUser } from "../helper/LoggedUser";
import { useAtom } from "jotai";
import { loggedUser } from "../main";

const username = signal("");
const password = signal("");
const backend_url = import.meta.env.VITE_BACKEND_URL;



function Login() {
  const [user, setUser] = useAtom(loggedUser);

 
  function submit(e) {
    e.preventDefault();
    const form = {
      username: username.value,
      password: password.value,
    };
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(form),
      url: backend_url + "auth/token",
      withCredentials: true,
    };
    axios(options)
      .then((res) => {
        if (res.status === 200) {
          console.log("user logged in");
         
          setUser(true);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err, "error in axios post to login user");
      });
  }
  const navigate = useNavigate();
  return (
    <form
      className="grid  md:grid-cols-6 mt-10 grid-cols-3"
      onSubmit={(e) => submit(e)}
    >
      <label className="form-control w-full max-w-xs ml-4">
        <input
          value={username.value}
          onChange={(e) => {
            username.value = e.target.value;
          }}
          type="text"
          placeholder="Username Or Email"
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <div className="label grid grid-cols-1">
          <span className="label-text-alt ">
            Must be between 3-13 characters long
          </span>
          <span className="label-text-alt ">
            Must be of the following characters: a-z, A-Z, 0-9
          </span>
        </div>
      </label>

      <label className="form-control w-full max-w-xs">
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered input-primary w-full max-w-xs"
          value={password.value}
          onChange={(e) => {
            password.value = e.target.value;
          }}
        />
        <div className="label grid grid-cols-1">
          <span className="label-text-alt ">
            Must contain at least 1 lower case letter
          </span>
          <span className="label-text-alt ">
            Must contain at least 1 Upper case letter
          </span>
          <span className="label-text-alt ">
            Must contain at least 1 special character of !?%&*
          </span>
          <span className="label-text-alt ">
            Must contain at least 1 digit 0-9
          </span>
          <span className="label-text-alt ">
            Must be between 8-22 characters long
          </span>
        </div>
      </label>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}
export default Login;

import { signal } from "@preact/signals-react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
// import { LoggedUser } from "../helper/LoggedUser";
import { userUpdate } from "../helper/logged";


const username = signal("");
const password = signal("");
const backend_url = import.meta.env.VITE_BACKEND_URL;

function Login() {
 
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

        //   console.log(userData.value);
        //   logged.value = true;
          userUpdate();
          //   setUser(true);
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
          
        </div>
      </label>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}
export default Login;

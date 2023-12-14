import { signal } from "@preact/signals-react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
// import { LoggedUser } from "../helper/LoggedUser";
import { userUpdate } from "../helper/logged";

const message = signal("");
const username = signal("");
const password = signal("");
const loading = signal("btn btn-primary");
const backend_url = import.meta.env.VITE_BACKEND_URL;

function Login() {
  function submit(e) {
    e.preventDefault();
    loading.value = "btn btn-disabled";
    loading.value = true;
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
          userUpdate();
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err, "error in axios post to login user");
        message.value = err.response.data.detail;
        loading.value = "btn btn-primary";
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
          required
          type="text"
          placeholder="Username Or Email"
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <div className="label grid grid-cols-1"></div>
      </label>

      <label className="form-control w-full max-w-xs">
        <input
          required
          type="password"
          placeholder="Password"
          className="input input-bordered input-primary w-full max-w-xs"
          value={password.value}
          onChange={(e) => {
            password.value = e.target.value;
          }}
        />
        <div className="label grid grid-cols-1"></div>
      </label>
      <button type="submit" className={loading.value}>
        Login
      </button>
      <div className="text-red-600">{message.value}</div>
    </form>
  );
}
export default Login;

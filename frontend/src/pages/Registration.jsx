import { signal, effect } from "@preact/signals-react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { LoggedUser } from "../helper/LoggedUser";

const username = signal("");
const email = signal("");
const password = signal("");
const backend_url = import.meta.env.VITE_BACKEND_URL;
const LoginBackendUrl = backend_url + "auth/token";

function Registration() {
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    const form = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    const LoginForm = {
      username: username.value,
      password: password.value,
    };
    console.log(form);
    axios
      .post(backend_url + "auth", form, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          console.log("user created");
          const options = {
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: qs.stringify(LoginForm),
            url: LoginBackendUrl,
            withCredentials: true,
          };
          axios(options)
            .then((res) => {
              if (res.status === 200) {
                console.log("user logged in");
                LoggedUser();
                navigate("/");
              } else {
                console.log("error in user login after registration");
              }
            })
            .catch((err) => {
              console.log(err, "error in axios post to login user");
            });
        } else {
          console.log("error in user submission syntax");
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err, "error in axios post to register user");
      });
  }
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
          placeholder="Username"
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
          type="email"
          placeholder="Email"
          className="input input-bordered input-primary w-full max-w-xs"
          value={email.value}
          onChange={(e) => {
            email.value = e.target.value;
          }}
        />
        <div className="label grid grid-cols-1">
          <span className="label-text-alt ">Must be between check backend</span>
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
        Register
      </button>
    </form>
  );
}
export default Registration;
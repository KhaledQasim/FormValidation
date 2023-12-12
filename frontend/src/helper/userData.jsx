// import { signal, effect } from "@preact/signals-react";
// import axios from "axios";
// const userData = signal("");
// const backend_url = import.meta.env.VITE_BACKEND_URL;


// effect(() => {
//   if (localStorage.getItem("logged") === null) {
//     localStorage.setItem("logged", "");
//   }
//   console.log("logged axios start");
//   axios
//     .get(backend_url + "cookie-jwt-validation", { withCredentials: true })
//     .then((res) => {
//       if (res.status === 200) {
//         logged.value = true;
//         localStorage.setItem("logged", true);
//       } else {
//         logged.value = false;
//         localStorage.setItem("logged", false);
//       }
//     })
//     .catch((err) => {
//       logged.value = false;
//       localStorage.setItem("logged", false);
//       console.log(err);
//     });

//   logged.value = localStorage.getItem("logged");
// });

// export { userData };

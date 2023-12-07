import axios from "axios";
import { signal, effect } from "@preact/signals-react";

// Import backend url from the .env file
const backend_url = import.meta.env.VITE_BACKEND_URL;

const message = signal("Loading...");

effect(()=>{
    axios.get(backend_url)
    .then((res) => {
        message.value = res.data.message;
    })
    .catch((err) => {
        message.value = "error check log";
        console.log(err);
    })
    ;
})

function GetMessage() {
  return (
    <>
      <h1>Message: {message.value}</h1>
    </>
  );
}

export default GetMessage;

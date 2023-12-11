import { signal , effect } from "@preact/signals-react";
const theme = signal("");

effect(() => {
  if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "");
  }
  theme.value = localStorage.getItem("theme");
});



export { theme };



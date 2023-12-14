import { effect, signal } from "@preact/signals-react";
import axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_URL;
import { logged } from "../helper/logged";

const userForms = signal([{}]);
const emptyUserForms = signal(true);

function viewUsersForms() {
  axios
    .get(backend_url + "form/all", { withCredentials: true })
    .then((res) => {
      if (res.status === 200) {
        if (res.data.length === 0) {
          emptyUserForms.value = true;
        } else {
          emptyUserForms.value = false;
        }
        userForms.value = res.data;
        console.log(userForms.value);
      }
    })
    .catch((err) => {
      console.log(err, "error in axios get to view user forms");
    });
}
function test(){
    const obj = {
        "dog":"cat"
    }
    console.log(JSON.stringify(obj))
    console.log(obj)
    console.log(JSON.parse(JSON.stringify(obj)))
}

effect(() => {
  if (logged.value === true) {
    viewUsersForms();
    // test();
  }
 

});



function UserForms() {
  return emptyUserForms.value ? (
    <div className="text-3xl text-primary">You have no forms saved, Please click on the -Create Form- NavBar Button</div>
  ) : (
    <>
      <div>Here are your forms:</div>
      <div>
        {userForms.value.map((item) => {
          return (
            <div className="my-10" key={item.id}>
              
              <div>ID: {item.id}</div>
              <div>First Name: {item.first_name}</div>
              <div>Last Name: {item.last_name}</div>
              <div>Phone Number: {item.phone}</div>
              <div>Date of Birth: {item.dob.split('T')[0]}</div>
              <div>Address: {item.address}</div>
              <div>Post Code: {item.post_code}</div>
              <div>Company: {item.company}</div>
              <div>Nationality: {item.nationality}</div>
              <pre className="mt-3 cursor-pointer" onClick={()=>{navigator.clipboard.writeText(JSON.stringify(item.json_file,null,2))}} >Json File Contents (click to copy): {JSON.stringify(item.json_file,null,2)}</pre>
              <div>``````````````````````````````````</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default UserForms;

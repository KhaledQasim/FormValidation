import GetMessage from "../components/GetMessage";
import { logged, userData } from "../helper/logged";

function App() {
  return (
    <>
      {logged.value ? (
        <p className="text-primary text-3xl hero mt-10">
          Welcome {userData.value.username}. Please click on the -Create Form- NavBar Button to create a form
        </p>
      ) : (
        <p className="text-primary text-3xl hero mt-10">
          Welcome, please create an account or log back in to create a form
        </p>
      )}

      <GetMessage />
    </>
  );
}

export default App;

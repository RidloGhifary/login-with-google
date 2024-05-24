import { Routes, Route } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Hallo this is home page</h1>} />
        <Route
          path="/login"
          element={
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;

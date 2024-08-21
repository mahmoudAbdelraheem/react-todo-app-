import { RouterProvider } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import routers from "./routers";
import { useState } from "react";
import { UserContextProvider } from "./context/user_context";

function App() {
  const [uid, setUid] = useState(null);
  return (
    <>
      <UserContextProvider value={{ uid, setUid }}>
        <RouterProvider router={routers} />
      </UserContextProvider>
    </>
  );
}

export default App;

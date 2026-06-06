import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import { GoogleAuthHandler } from "./components/auth/GoogleAuthHandler";

function App() {
  return (
    <>
      <GoogleAuthHandler />
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </>
  );
}

export default App;

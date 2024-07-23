import "./App.css";
import { Route, Routes } from "react-router";
import { privateRoutes, publicRoutes } from "./routers/routes";
// import { getUserInfo, initAuthHeader } from "@/shared/lib/auth";
import { useUserStore } from "@/entities/user/model/store/userStore";
// import axios from "axios";

// const token = initAuthHeader(axios);
// if (token) {
//   const user = getUserInfo(token);
//   useUserStore.getState().setUser(user);
// }

function App() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  console.log(isAuthenticated);

  if (isAuthenticated) {
    return (
      <Routes>
        {privateRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    );
  }

  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default App;

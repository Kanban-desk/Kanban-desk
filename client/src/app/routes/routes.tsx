import { SignUpPage } from "@/pages/sign-up";
import { Introduction } from "@/pages/introduction";
import { LoginPage } from "@/pages/login";
import { HomePage } from "@/pages/main";

export const privateRoutes = [
  {
    path: "/introduction",
    element: <Introduction />,
  },
  {
    path: "/create-desks",
    element: "<CreateDesk />"
  }
];

export const publicRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  //temproary here in order to design them
  {
    path: "/create-desk",
    element: "<CreateDesk />"
  }
];

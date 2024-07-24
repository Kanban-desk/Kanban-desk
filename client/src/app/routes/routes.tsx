import { SignUpPage } from "@/pages/sign-up";
import { Introduction } from "@/pages/introduction";
import { LoginPage } from "@/pages/login";

export const privateRoutes = [
  {
    path: "/introductions",
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
    element: "<Home />",
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
    path: "/introduction",
    element: <Introduction />,
  },
  {
    path: "/create-desk",
    element: "<CreateDesk />"
  }
];

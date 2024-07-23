import { SignUpPage } from "@/pages/sign-up";
import { Introduction } from "@/pages/introduction";
import { LoginPage } from "@/pages/login";

export const privateRoutes = [
  {
    path: "/introduction",
    element: <Introduction />,
  },
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
];

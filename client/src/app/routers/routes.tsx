import { SignUpPage } from "@/pages/sign-up";
import { Introduction } from "@/pages/introduction";

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
    element: "<Login />",
  },
];

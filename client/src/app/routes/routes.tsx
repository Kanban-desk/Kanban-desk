import { SignUpPage } from "@/pages/sign-up";
import { Introduction } from "@/pages/introduction";
import { LoginPage } from "@/pages/login";
import { HomePage } from "@/pages/main";
import { CreateDeskPage } from "@/pages/createDesk";

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
    element: <CreateDeskPage />
  },
];

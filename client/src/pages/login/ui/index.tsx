import { FC } from "react";
import LoginForm from "@/features/auth/ui/Login-form";
import AuthImg from "@/assets/4406c6e741804bf3e3cefae36f09cc8a.png";
import "./index.scss";

const LoginPage: FC = () => {
  return (
    <div className="login-container">
      <div className="login-img-container">
        <img
          className="login-img"
          src={AuthImg}
          alt="registration-background"
        />
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

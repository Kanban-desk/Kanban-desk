import { FC, useState } from "react";
import Input from "@/shared/ui/Input";
import { useLogin } from "@/entities/user/model/hooks/useLogin";
import { AuthDto } from "@/entities/user/api/types"; 
import './index.scss';
import { login } from "@/shared/lib/auth";
import { useUserStore } from "@/entities/user/model/store/userStore";
import { useNavigate } from 'react-router-dom';

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const loginMutation = useLogin({
    onSuccess: (response) => {
      if (response.error) {
        console.error("Login failed:", response.error);
        setErrors({ form: response.error });
      } else if (response.data) {
        console.log("Login successful", response.data);
        login(response.data.accessToken);
        setUser(response.data.user);
        navigate('/desk:id');
      }
    },
    onError: (error) => {
      console.error("Login failed", error);
      setErrors({ form: error.message });
    },
  });

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      const signUpData: AuthDto = { email, password };
      loginMutation.mutate(signUpData);
    }
  };

  return (
    <div className="login-form-container">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <button type="submit" disabled={loginMutation.status === 'pending'}>
          {loginMutation.status === 'pending' ? "Loggin in..." : "Log in"}
        </button>
        {errors.form && <div className="login-form-error">{errors.form}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
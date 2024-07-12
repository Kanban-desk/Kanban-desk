import { FC, useState } from "react";
import Input from "../../../../shared/ui/Input/index";
import { useRegister } from "../../../../entities/user/model/useRegister";
import { SignUpDto } from "../../../../entities/user/api/types"; 
import './index.scss';

const RegisterForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const registerMutation = useRegister({
    onSuccess: (response) => {
      if (response.error) {
        console.error("Registration failed:", response.error);
        setErrors({ form: response.error });
      } else if (response.data) {
        console.log("Registration successful", response.data);
        // Сохранить токены
        // Обновить состояние пользователя в приложении
        // Перенаправить пользователя на другую страницу
      }
    },
    onError: (error) => {
      console.error("Registration failed", error);
      setErrors({ form: error.message });
    },
  });

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Password confirmation is required";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      const signUpData: SignUpDto = { email, password };
      registerMutation.mutate(signUpData);
    }
  };

  return (
    <div className="registration-form-container">
      <h1>Registration</h1>
      <form onSubmit={handleSubmit} className="registration-form">
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
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />
        <button type="submit" disabled={registerMutation.status === 'pending'}>
          {registerMutation.status === 'pending' ? "Registering..." : "Register"}
        </button>
        {errors.form && <div className="registration-form-error">{errors.form}</div>}
      </form>
    </div>
  );
};

export default RegisterForm;
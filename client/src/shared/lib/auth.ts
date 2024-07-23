import { User } from "@/entities/user/api/types";
// import { Axios } from "axios";
import { jwtDecode } from "jwt-decode";

export const login = (token: string) => {
  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.removeItem("token");
};

// export const getToken = () => {
//   return localStorage.getItem("token");
// };

// export const initAuthHeader = (axios: Axios) => {
//   const token = getToken();

//   if (!token) {
//     console.log("There is no token");
//     return;
//   }

//   axios.defaults.headers.common["Authorization"] = "Bearer " + token;
//   return token;
// };

export const getUserInfo = (token: string): User | null => {
  try {
    const jwt = jwtDecode(token);
    const expiresIn = jwt.exp! * 1000 - Date.now();
    if (expiresIn > 15 * 60 * 1000 && jwt.sub) {
      return { email: jwt.sub };
    }
  } catch (error) {
    console.log("Some error happened during jwt decoding");
  }
  return null;
};

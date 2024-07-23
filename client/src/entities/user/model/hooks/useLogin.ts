import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { userApi } from "../../api/userApi";
import { AuthDto, AuthResponse } from "../../api/types";
import { ApiResponse } from "../../../../shared/api/types";

export const useLogin = (
  options?: UseMutationOptions<ApiResponse<AuthResponse>, Error, AuthDto>
) => {
  return useMutation<ApiResponse<AuthResponse>, Error, AuthDto>({
    mutationFn: userApi.login,
    ...options,
  });
};

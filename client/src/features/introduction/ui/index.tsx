import { useState, ChangeEvent, FormEvent, FC } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import "./index.scss";
import { useNavigate } from "react-router";
import { useUserStore } from "@/entities/user/model/store/userStore";
import { UpdateUserData, UserUpdateResponse } from "@/entities/user/api/types";
import $api from "@/shared/lib/auth.interceptor";
import { ApiResponse } from "@/shared/api/types";

const IntroductionForm: FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatarFile, setAvatarFile] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const userId = useUserStore((set) => set.user?.user_id);
  const updateUser = useUserStore((state) => state.updateUser);
  const navigate = useNavigate();

const updateUserMutation = useMutation<ApiResponse<UserUpdateResponse>, Error, UpdateUserData>({
  mutationFn: async (userData: UpdateUserData) => {
    const cleanUserData = Object.fromEntries(
        Object.entries(userData).filter(([_, value]) => value !== undefined)
      );

    const response = await $api.patch(`/user/update/${userId}`, cleanUserData);
    if (response.status !== 200) {
      throw new Error(response.data.message || 'An error occurred during user update');
    }
    
    return response.data;
  },
  onSuccess: (data) => {
    updateUser(data.data?.updatedUser);
    navigate("/create-desk");
  },
  onError: (error: Error) => {
    console.error("Error updating user:", error);
  },
});

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const updateData: UpdateUserData = {};
    if (firstName) {
      updateData.first_name = firstName;
    }
    if (lastName) {
      updateData.last_name = lastName;
    }
    if (avatarFile) {
      updateData.avatar_path = avatarFile;
    }
  
    updateUserMutation.mutate(updateData);
  };

  const handleSkip = () => {
    navigate("/create-desk");
  };

  return (
    <Box sx={{ margin: "auto", textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please introduce yourself.
      </Typography>
      <form onSubmit={handleSubmit} className="introduction-form">
        <Box className="introduction-form-container">
          <Box className="introduction-form__avatar" sx={{ mt: 3, mb: 3 }}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="avatar-upload"
              type="file"
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatar-upload">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            {avatarPreview && (
              <Avatar
                src={avatarPreview}
                sx={{ width: 100, height: 100, margin: "auto", mt: 2 }}
              />
            )}
          </Box>
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
              margin="normal"
              required
            />
          </Box>
        </Box>
        <Box sx={{ gap: 2 }}>
          <Button onClick={handleSkip}>Skip</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!firstName}
          >
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default IntroductionForm;

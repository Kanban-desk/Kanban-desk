import React, { useState, ChangeEvent } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container, 
  Avatar,
  Paper,
  Grid
} from '@mui/material';
import { styled } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DeskStatuses } from '@/widgets/DeskStatuses';

const Input = styled('input')({
  display: 'none',
});

const CreateDeskPage: React.FC = () => {
  const [boardName, setBoardName] = useState<string>('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  const handleBoardNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBoardName(event.target.value);
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCreateBoard = () => {
    console.log('Creating board:', { name: boardName, avatar: avatarFile });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, mb: 4, p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          Создайте свою доску
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Имя доски"
              variant="outlined"
              value={boardName}
              onChange={handleBoardNameChange}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Аватар доски
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={avatarPreview}
                sx={{ width: 80, height: 80, border: '2px solid #1976d2' }}
              >
                {!avatarPreview && <CloudUploadIcon sx={{ fontSize: 40 }} />}
              </Avatar>
              <label htmlFor="avatar-upload">
                <Input
                  accept="image/*"
                  id="avatar-upload"
                  type="file"
                  onChange={handleAvatarChange}
                />
                <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />}>
                  Выбрать аватар
                </Button>
              </label>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <DeskStatuses />
          </Grid>

          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleCreateBoard}
              fullWidth
              size="large"
              sx={{ mt: 2 }}
            >
              Создать доску
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreateDeskPage;
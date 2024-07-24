import React from "react";
import { Box, Button, Container, Typography, Paper, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: "center",
  background: "linear-gradient(45deg, #8c92c2 30%, #f5795e 90%)",
}));

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Container>
      <Box sx={{ mt: 8, mb: 4 }}>
        <StyledPaper elevation={3}>
          <Typography variant="h2" component="h1" gutterBottom color="white">
            Kanban Desk
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom color="white">
            Управляйте своими задачами эффективно и с удовольствием!
          </Typography>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "white",
                  color: "#858bc6",
                  "&:hover": {
                    bgcolor: "#f0f0f0",
                  },
                }}
                onClick={handleLogin}
              >
                Войти
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "white",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "white",
                  },
                }}
                onClick={handleRegister}
              >
                Зарегистрироваться
              </Button>
            </Grid>
          </Grid>
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default HomePage;

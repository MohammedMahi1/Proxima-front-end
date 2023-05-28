import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import NotAuth from "../../../middleware/NotAuth";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice";

const Login = () => {
  const [hundler, setHundler] = useState(false);
  const [type, setType] = useState('password');

  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(login({ email: data.get('email'), password: data.get('password') }));
  };
  const hundleShow = (e) => {
    setHundler(e.target.checked);
  }

  useEffect(() => {
    if (hundler === true) {
      setType('text');
    } else {
      setType('password');
    }
  }, [hundler])
  return (
    <Container component="main"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',

      }}>

      <Paper
        sx={{
          padding: 7,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "#2166e8" }} component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              variant="filled"
              margin="normal"
              required
              type="email"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={type}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value={true} color="primary" onChange={hundleShow} />}
              label="Show Password"
            />
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ mt: 3, mb: 2, background: "#2166e8" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
export default NotAuth(Login)
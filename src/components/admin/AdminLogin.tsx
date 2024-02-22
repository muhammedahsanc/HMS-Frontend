import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputChange, loginDataProps } from '../../interfaces';
import { emailRegex } from '../../utils';
import { loginSubmit } from './loginSubmit';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToList } from '../../redux/data';
const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<loginDataProps>({
    username: "",
    password: "",
  });
  const [error, setError] = React.useState<string>("");
  const checkEmail = (e: InputChange) => {
    const enteredEmail = e.target.value;
    setFormData({ ...formData, username: enteredEmail });
    if (emailRegex.test(enteredEmail) === false)
      setError("Please enter a valid email address");
    else setError("");
    if (enteredEmail == "") setError("");
  };
  function submitLoginData() {
   console.log("submitted");
   
    const loginName = loginSubmit({ formData, setFormData, error });
    console.log(loginName);
    
    const promise1 = Promise.resolve(loginName);
    promise1.then((value) => {
      dispatch(addToList({ data: value.data, role: value.role }));
      // navigate(`/${value.role.toLowerCase()}`);
      console.log(value.role);
    });
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="div"  sx={{ mt: 1 }}>
            <TextField
            value={formData.username}
            onChange={checkEmail}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type= {showPassword ? "text":"password"}
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
            <FormControlLabel
              control={<Checkbox checked={showPassword} onChange={()=>{
              setShowPassword(!showPassword)
              }} value="remember" color="primary" />}
              label="Show password
              +"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => submitLoginData()}
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
      </Container>
    </ThemeProvider>
  );
}
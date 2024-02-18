// LoginPage.js
import React from "react";
import styled from "styled-components";
import FormControlLabel from "@mui/material/FormControlLabel";
import { InputChange, loginDataProps } from "../../interfaces";
import Checkbox from "@mui/material/Checkbox";
import { emailRegex } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToList } from "../../redux/data";
import loginSubmit from "./loginSubmit";
const LoginPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 97.5vh;
  background: #f5f5f5;
`;
const LoginForm = styled.form`
  width: 400px;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  text-align: left;
`;

const Heading = styled.h2`
  color: #2a5298;
  margin-bottom: 30px;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #333;
`;

const Input = styled.input`
  width: 93%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #2a5298;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #1e3c72;
  }
`;

const LoginPage = () => {
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
      // navigate(`administrater`);
      console.log(value.role);
    });
  }
  return (
    <LoginPageWrapper>
      <LoginForm>
        <Heading>Login</Heading>

        <Label htmlFor="username">Username:</Label>
        <Input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={checkEmail}
        />

        <Label htmlFor="password">Password:</Label>
        <Input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showPassword}
              onChange={() => {
                setShowPassword(!showPassword);
              }}
              value="remember"
              color="primary"
            />
          }
          label="Show password
              +"
        />
        <Button type="submit" onClick={() => submitLoginData()}>
          Login
        </Button>
      </LoginForm>
    </LoginPageWrapper>
  );
};

export default LoginPage;

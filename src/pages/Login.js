import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth.action";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";

const Login = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(password));
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Input.Password
            onChange={(e) => setPassword(e.target.value)}
            labelPlaceholder="Mot de passe"
          />
          <Button type="submit" color="success" auto>
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

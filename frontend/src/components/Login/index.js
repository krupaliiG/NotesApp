import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onLoginSuccess = (jwtToken) => {
    // Cookies.set("jwt_token", jwtToken, { expires: 30 });
    history.push("/");
  };

  const onLogin = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:7000/api/v1/users/login",
      { email, password },
      { withCredentials: true }
    );
    setEmail("");
    setPassword("");

    if (response.statusText === "OK") {
      const { data } = response;
      const { token } = data;
      onLoginSuccess(token);
    }
  };

  return (
    <form onSubmit={onLogin} className="form-div">
      <h1>Welcome to Notes Application!</h1>
      <label>Enter your Email:</label>
      <input type="text" value={email} onChange={onChangeEmail} />
      <label>Enter your Password:</label>
      <input type="password" value={password} onChange={onChangePassword} />
      <button type="submit">Login</button>
      <p>
        Need an account?<a href="/register">Register</a>
      </p>
    </form>
  );
};

export default Login;

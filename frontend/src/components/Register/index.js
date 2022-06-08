import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picUrl, setPicUrl] = useState("");

  const onRegister = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("picUrl", picUrl);

      await axios.post("http://localhost:7000/api/v1/users/signup", formData);
      history.push("/login");
    } catch (error) {
      console.log("error", error);
    }
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeImage = (event) => {
    setPicUrl(event.target.files[0]);
  };
  return (
    <>
      <form onSubmit={onRegister} className="form-div">
        <h1>Welcome to Notes Application!</h1>
        <label>Enter your Name:</label>
        <input type="text" value={name} onChange={onChangeName} />
        <label>Enter your Email:</label>
        <input type="text" value={email} onChange={onChangeEmail} />
        <label>Enter your Password:</label>
        <input type="password" value={password} onChange={onChangePassword} />
        <label htmlFor="myfile">Select photo:</label>
        <input
          type="file"
          id="myfile"
          name="myfile"
          accept="image/*"
          onChange={onChangeImage}
        ></input>
        <button type="submit">Register</button>
        <p>
          Already have an account?<a href="/login">Login</a>
        </p>
      </form>
    </>
  );
};

export default Register;

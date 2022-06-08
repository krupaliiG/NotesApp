import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Profile = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [pic, setPic] = useState();
  // const [img, setImg] = useState([]);
  // const [imgName, setimgName] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picUrl, setPicUrl] = useState("");
  const [img, setImg] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const response = await axios.get(
      "http://localhost:7000/api/v1/users/getuserinfo",
      {
        withCredentials: true,
      }
    );
    const { data } = response;
    const { userDetail } = data;
    const { name, email, password, pic } = userDetail;
    setName(name);
    setEmail(email);
    setPassword(password);
    setImg(pic);
  };

  const onUpdateInfo = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("picUrl", picUrl);
    await axios.post(
      "http://localhost:7000/api/v1/users/updateuserinfo",
      formData,
      {
        withCredentials: true,
      }
    );
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeImage = (e) => {
    e.preventDefault();
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
    setPicUrl(e.target.files[0]);
  };

  return (
    <>
      <img src={img} alt="" height="400" width="400" />
      <div className="form-div">
        <label>Edit your name:</label>
        <input type="text" value={name} onChange={onChangeName} />
        <label>Edit your email:</label>
        <input type="email" value={email} onChange={onChangeEmail} />
        <label>Edit your Password:</label>
        <input type="password" value="password" onChange={onChangePassword} />
        <label htmlFor="myfile">Select photo:</label>
        <input
          type="file"
          id="myfile"
          name="myfile"
          onChange={onChangeImage}
        ></input>
        <div>
          <button type="submit" onClick={onUpdateInfo}>
            Update
          </button>
          <button type="submit">Cancle</button>
          <Link to="/">
            <button type="button">Back to App</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;

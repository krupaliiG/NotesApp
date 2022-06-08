import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [existingTodo, setexistingTodo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:7000/api/v1/todo/gettodolist",
      {
        withCredentials: true,
      }
    );
    const { data } = response;
    const { existingData } = data;
    setexistingTodo([...existingData]);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChnageDescription = (event) => {
    setDescription(event.target.value);
  };

  const onAddTodo = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:7000/api/v1/todo/addtodo",
      {
        title,
        description,
      },
      { withCredentials: true }
    );

    if (response.statusText === "OK") {
      const { data } = response;
      const { message } = data;
      alert(message);
    }

    setTitle("");
    setDescription("");
    fetchData();
  };

  const onClickMyProfile = () => {
    history.replace("/myprofile");
  };

  const onClickLogout = async () => {
    await axios.post("http://localhost:7000/api/v1/users/logout", {
      withCredentials: true,
    });
    history.replace("/login");
  };

  return (
    <>
      <button type="button" onClick={onClickMyProfile}>
        My Profile
      </button>
      <button type="button" onClick={onClickLogout}>
        Logout
      </button>
      <form onSubmit={onAddTodo} className="form-div">
        <h1>Welcome to Notes Application!</h1>
        <label>Enter Title:</label>
        <input type="text" value={title} onChange={onChangeTitle} />
        <label>Enter description:</label>
        <input
          type="textarea"
          value={description}
          onChange={onChnageDescription}
        />
        <button type="submit">Add todo</button>
      </form>
      <ul>
        {existingTodo.map((eachTodo) => {
          const { title, _id, description } = eachTodo;

          return (
            <li key={_id}>
              <b>{title} </b>
              <span> {description}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const container = {
  maxWidth: 800,
  margin: "0 auto",
  backgroundColor: "green",
  padding: 20,
  display: "flex",
  flexWrap: "wrap",
};

const avatar = {
  width: "40%",
  height: 250,
  objectFit: "cover",
  backgroundColor: "white",
  margin: 7,
};

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:5000/user/");
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async id => {
    try {
      const res = await fetch(`http://localhost:5000/user/${id}`, {
        method: "DELETE",
      });

      //Once deleted, we need to show the updated list of users
      if (res.ok) {
        const updatedUsersList = users.filter(user => user._id !== id);
        setUsers(updatedUsersList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={container}>
      {users?.map(user => (
        <div style={avatar} key={user._id}>
          <img
            src={user.avatar}
            alt=""
            style={{ width: "100%", height: "50%" }}
          />
          <div className="p-2">
            <h3>{user.name}</h3>
            <div className="d-flex justify-content-between align-items-center">
              <Link to={`/edit/${user._id}`} style={{ textDecoration: "none" }}>
                Edit
              </Link>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;

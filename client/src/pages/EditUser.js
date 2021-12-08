import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const id = window.location.pathname.split("/").slice(-1)[0];

  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const handleChange = name => e => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();

      formData.append("image", data.image);
      formData.append("name", data.name);

      const res = await fetch(`http://localhost:5000/user/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        setData({ name: "", image: "" });

        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:5000/user/${id}`);
      const data = await res.json();
      setData(data);
    };
    getData();
  }, [id]);

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <div className="mb-3">
        <input
          className="form-control"
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange("name")}
        />
      </div>
      <div className="mb-">
        <input
          className="form-control"
          type="file"
          accept="image/*"
          name="image"
          onChange={handleChange("image")}
        />
      </div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
};

export default EditUser;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  /*
  const [data, setData] = useState({
    name: "",
    image: "",
  });
*/
  /*
  const handleChange = name => e => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };
*/
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleChangeName = e => {
    setName(e.target.value);
  };

  const handleChangeImage = e => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      /*
      formData.append("image", data.image);
      formData.append("name", data.name);
      */
      formData.append("image", image);
      formData.append("name", name);

      const res = await fetch("http://localhost:5000/user/", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        /*
        setData({ name: "", image: "" });
        */
        setName("");
        setImage("");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Enter name"
          type="text"
          name="name"
          value={name}
          onChange={handleChangeName}
          /* 
           value={data.name}
            onChange={handleChange("name")} 
        */
        />
      </div>

      <div className="mb-3">
        <input
          className="form-control"
          type="file"
          accept="image/*"
          name="image"
          onChange={handleChangeImage}
          /* onChange={handleChange("image")}*/
        />
      </div>

      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddUser;

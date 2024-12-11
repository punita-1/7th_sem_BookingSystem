import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState(null); // Changed to null for better handling
  const [info, setInfo] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle form submission
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      let imgUrl = "";

      // Upload image if a file is selected
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
          data
        );

        imgUrl = uploadRes.data.url; // Get uploaded image URL
      }

      // Prepare new user data
      const newUser = {
        ...info,
        img: imgUrl || "", // Use image URL if uploaded, else empty string
      };

      // Send user data to backend
      await axios.post("http://localhost:8800/api/auth/register", newUser);

      alert("User registered successfully!");
    } catch (err) {
      console.error(err);
      alert("Error registering user. Please check the console for details.");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="User"
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

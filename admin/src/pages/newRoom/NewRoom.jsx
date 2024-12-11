import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(""); // Ensure it's initialized as an empty string
  const [rooms, setRooms] = useState("");

  const { data, loading, error } = useFetch("/hotels");

  // Handle input changes
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle the click event for submitting the room details
  const handleClick = async (e) => {
    e.preventDefault();

    // Validate if hotelId is selected
    if (!hotelId) {
      alert("Please select a hotel.");
      return; // Prevent form submission if no hotel is selected
    }

    // Convert room numbers into an array of objects
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));

    try {
      // Make the POST request to add a new room
      await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
      alert("Room added successfully!"); // Optional success message
    } catch (err) {
      console.error("Error adding room:", err);
      alert("There was an error adding the room.");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {/* Loop through roomInputs and generate form fields */}
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              {/* Input for room numbers */}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="Enter comma-separated room numbers"
                />
              </div>
              {/* Dropdown to choose a hotel */}
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                  value={hotelId} // Bind value to ensure the correct hotel is selected
                >
                  {loading
                    ? "Loading hotels..."
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>
              {/* Submit button */}
              <button onClick={handleClick}>Add Room</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;

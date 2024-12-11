import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleClick = () => {
    // Navigate to /hotels when a property is clicked
    navigate("/hotels");
  };

  return (
    <div className="fp">
      {loading ? (
        "Loading... please wait"
      ) : error ? (
        <div className="error">Error: {error.message}</div>
      ) : (
        <>
          {data.length > 0 ? (
            data.map((item) => (
              <div className="fpItem" key={item._id} onClick={handleClick}>
                <img
                  src={item.photos && item.photos[0]} // Fallback if photos are missing
                  alt={item.name || "Featured Property"} // Fallback if name is missing
                  className="fpImg"
                />
                <span className="fpName">{item.name || "No name available"}</span>
                <span className="fpCity">{item.city || "Unknown City"}</span>
                <span className="fpPrice">
                  Starting from ${item.cheapestPrice || "Not available"}
                </span>
                {item.rating && (
                  <div className="fpRating">
                    <button>{item.rating}</button>
                    <span>Excellent</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>No featured properties available</div>
          )}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;

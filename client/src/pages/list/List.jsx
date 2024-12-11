// // import "./list.css";
// // import Navbar from "../../components/navbar/Navbar";
// // import Header from "../../components/header/Header";
// // import { useLocation } from "react-router-dom";
// // import { useState } from "react";
// // import { format } from "date-fns";
// // import { DateRange } from "react-date-range";
// // import SearchItem from "../../components/searchItem/SearchItem";
// // import useFetch from "../../hooks/useFetch";

// // const List = () => {
// //   const location = useLocation();
// //   const [destination, setDestination] = useState(location.state.destination);
// //   const [dates, setDates] = useState(location.state.dates);
// //   const [openDate, setOpenDate] = useState(false);
// //   const [options, setOptions] = useState(location.state.options);
// //   const [min, setMin] = useState(undefined);
// //   const [max, setMax] = useState(undefined);

// //   const { data, loading, error, reFetch } = useFetch(
// //     `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
// //   );

// //   const handleClick = () => {
// //     reFetch();
// //   };

// //   return (
// //     <div>
// //       <Navbar />
// //       <Header type="list" />
// //       <div className="listContainer">
// //         <div className="listWrapper">
// //           <div className="listSearch">
// //             <h1 className="lsTitle">Search</h1>
// //             <div className="lsItem">
// //               <label>Destination</label>
// //               <input placeholder={destination} type="text" />
// //             </div>
// //             <div className="lsItem">
// //               <label>Check-in Date</label>
// //               <span onClick={() => setOpenDate(!openDate)}>{`${format(
// //                 dates[0].startDate,
// //                 "MM/dd/yyyy"
// //               )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
// //               {openDate && (
// //                 <DateRange
// //                   onChange={(item) => setDates([item.selection])}
// //                   minDate={new Date()}
// //                   ranges={dates}
// //                 />
// //               )}
// //             </div>
// //             <div className="lsItem">
// //               <label>Options</label>
// //               <div className="lsOptions">
// //                 <div className="lsOptionItem">
// //                   <span className="lsOptionText">
// //                     Min price <small>per night</small>
// //                   </span>
// //                   <input
// //                     type="number"
// //                     onChange={(e) => setMin(e.target.value)}
// //                     className="lsOptionInput"
// //                   />
// //                 </div>
// //                 <div className="lsOptionItem">
// //                   <span className="lsOptionText">
// //                     Max price <small>per night</small>
// //                   </span>
// //                   <input
// //                     type="number"
// //                     onChange={(e) => setMax(e.target.value)}
// //                     className="lsOptionInput"
// //                   />
// //                 </div>
// //                 <div className="lsOptionItem">
// //                   <span className="lsOptionText">Adult</span>
// //                   <input
// //                     type="number"
// //                     min={1}
// //                     className="lsOptionInput"
// //                     placeholder={options.adult}
// //                   />
// //                 </div>
// //                 <div className="lsOptionItem">
// //                   <span className="lsOptionText">Children</span>
// //                   <input
// //                     type="number"
// //                     min={0}
// //                     className="lsOptionInput"
// //                     placeholder={options.children}
// //                   />
// //                 </div>
// //                 <div className="lsOptionItem">
// //                   <span className="lsOptionText">Room</span>
// //                   <input
// //                     type="number"
// //                     min={1}
// //                     className="lsOptionInput"
// //                     placeholder={options.room}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //             <button onClick={handleClick}>Search</button>
// //           </div>
// //           <div className="listResult">
// //             {loading ? (
// //               "loading"
// //             ) : (
// //               <>
// //                 {data.map((item) => (
// //                   <SearchItem item={item} key={item._id} />
// //                 ))}
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default List;
// import "./list.css";
// import Navbar from "../../components/navbar/Navbar";
// import Header from "../../components/header/Header";
// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { format } from "date-fns";
// import { DateRange } from "react-date-range";
// import SearchItem from "../../components/searchItem/SearchItem";
// import useFetch from "../../hooks/useFetch";

// const List = () => {
//   const location = useLocation();
//   const [destination, setDestination] = useState(location.state?.destination || "");
//   const [dates, setDates] = useState(location.state?.dates || []);
//   const [openDate, setOpenDate] = useState(false);
//   const [options, setOptions] = useState(location.state?.options || {});
//   const [min, setMin] = useState(undefined);
//   const [max, setMax] = useState(undefined);

//   // Build the query string based on the search criteria
//   const query = {
//     city: destination || "", // If no destination, search for all hotels
//     min: min || 0,
//     max: max || 999,
//     adult: options.adult || 1, // Default adult count if not provided
//     children: options.children || 0, // Default children count if not provided
//     room: options.room || 1, // Default room count if not provided
//     startDate: dates.length > 0 ? format(dates[0].startDate, "yyyy-MM-dd") : "", // Only set date range if it's provided
//     endDate: dates.length > 0 ? format(dates[0].endDate, "yyyy-MM-dd") : "", // Only set date range if it's provided
//   };

//   const { data, loading, error, reFetch } = useFetch(
//     `/hotels?city=${query.city}&min=${query.min}&max=${query.max}&adult=${query.adult}&children=${query.children}&room=${query.room}&startDate=${query.startDate}&endDate=${query.endDate}`
//   );

//   const handleClick = () => {
//     reFetch(); // Fetch data based on updated search filters
//   };

//   return (
//     <div>
//       <Navbar />
//       <Header type="list" />
//       <div className="listContainer">
//         <div className="listWrapper">
//           <div className="listSearch">
//             <h1 className="lsTitle">Search</h1>
//             <div className="lsItem">
//               <label>Destination</label>
//               <input
//                 value={destination}
//                 onChange={(e) => setDestination(e.target.value)}
//                 placeholder="Enter destination"
//                 type="text"
//               />
//             </div>
//             <div className="lsItem">
//               <label>Check-in Date</label>
//               <span onClick={() => setOpenDate(!openDate)}>{`${dates.length > 0 ? format(dates[0].startDate, "MM/dd/yyyy") : "Select dates"}`}</span>
//               {openDate && (
//                 <DateRange
//                   onChange={(item) => setDates([item.selection])}
//                   minDate={new Date()}
//                   ranges={dates}
//                 />
//               )}
//             </div>
//             <div className="lsItem">
//               <label>Options</label>
//               <div className="lsOptions">
//                 <div className="lsOptionItem">
//                   <span className="lsOptionText">
//                     Min price <small>per night</small>
//                   </span>
//                   <input
//                     type="number"
//                     onChange={(e) => setMin(e.target.value)}
//                     className="lsOptionInput"
//                     value={min}
//                   />
//                 </div>
//                 <div className="lsOptionItem">
//                   <span className="lsOptionText">
//                     Max price <small>per night</small>
//                   </span>
//                   <input
//                     type="number"
//                     onChange={(e) => setMax(e.target.value)}
//                     className="lsOptionInput"
//                     value={max}
//                   />
//                 </div>
//                 <div className="lsOptionItem">
//                   <span className="lsOptionText">Adult</span>
//                   <input
//                     type="number"
//                     min={1}
//                     className="lsOptionInput"
//                     value={options.adult || 1}
//                     onChange={(e) => setOptions({ ...options, adult: e.target.value })}
//                   />
//                 </div>
//                 <div className="lsOptionItem">
//                   <span className="lsOptionText">Children</span>
//                   <input
//                     type="number"
//                     min={0}
//                     className="lsOptionInput"
//                     value={options.children || 0}
//                     onChange={(e) => setOptions({ ...options, children: e.target.value })}
//                   />
//                 </div>
//                 <div className="lsOptionItem">
//                   <span className="lsOptionText">Room</span>
//                   <input
//                     type="number"
//                     min={1}
//                     className="lsOptionInput"
//                     value={options.room || 1}
//                     onChange={(e) => setOptions({ ...options, room: e.target.value })}
//                   />
//                 </div>
//               </div>
//             </div>
//             <button onClick={handleClick}>Search</button>
//           </div>
//           <div className="listResult">
//             {loading ? (
//               "Loading..."
//             ) : (
//               <>
//                 {data && data.length > 0 ? (
//                   data.map((item) => (
//                     <SearchItem item={item} key={item._id} />
//                   ))
//                 ) : (
//                   <p>No hotels found for your search criteria. Showing all hotels.</p>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default List;

import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const { city, dates, options, dispatch } = useContext(SearchContext); // Consume context
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [openDate, setOpenDate] = useState(false);

  // Build the query string based on the search state
  const query = {
    city: city || "", // If no city is set, fetch all hotels
    min: min || 0,
    max: max || 999,
    adult: options.adult || 1, // Default adult count if not provided
    children: options.children || 0, // Default children count if not provided
    room: options.room || 1, // Default room count if not provided
    startDate: dates.length > 0 ? format(dates[0].startDate, "yyyy-MM-dd") : "", // Only set date range if it's provided
    endDate: dates.length > 0 ? format(dates[0].endDate, "yyyy-MM-dd") : "", // Only set date range if it's provided
  };

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${query.city}&min=${query.min}&max=${query.max}&adult=${query.adult}&children=${query.children}&room=${query.room}&startDate=${query.startDate}&endDate=${query.endDate}`
  );

  // Handle search button click
  const handleClick = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { city, dates, options },
    });
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                value={city}
                onChange={(e) => dispatch({ type: "NEW_SEARCH", payload: { city: e.target.value } })}
                placeholder="Enter destination"
                type="text"
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${dates.length > 0 ? format(dates[0].startDate, "MM/dd/yyyy") : "Select dates"}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => dispatch({ type: "NEW_SEARCH", payload: { dates: [item.selection] } })}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                    value={min}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                    value={max}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={options.adult || 1}
                    onChange={(e) => dispatch({ type: "NEW_SEARCH", payload: { options: { ...options, adult: e.target.value } } })}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    value={options.children || 0}
                    onChange={(e) => dispatch({ type: "NEW_SEARCH", payload: { options: { ...options, children: e.target.value } } })}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={options.room || 1}
                    onChange={(e) => dispatch({ type: "NEW_SEARCH", payload: { options: { ...options, room: e.target.value } } })}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "Loading..."
            ) : (
              <>
                {data && data.length > 0 ? (
                  data.map((item) => (
                    <SearchItem item={item} key={item._id} />
                  ))
                ) : (
                  <p>No hotels found for your search criteria. Showing all hotels.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

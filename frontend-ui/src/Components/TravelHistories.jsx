import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../App";

const TravelHistories = () => {
  const [travelHistories, setTravelHistories] = useState();
  const navigate = useNavigate();

  //function to fetch all travel histories for all users
  const getAllTravelHistories = async () => {
    try {
      const response = await axios.get(`${baseurl}/user`);
      if (response.status === 200) {
        setTravelHistories(response.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTravelHistories();
  }, []);

  if (travelHistories && travelHistories.length <= 0) {
    return (
      <>
        <h2>No Travel Histories Found</h2>
        <button onClick={() => navigate("/create-travel-history")}>
          Create New Travel History
        </button>
      </>
    );
  }

  if (travelHistories && travelHistories.length > 0) {
    return (
      <>
        <h2>Travel Histories</h2>
        {travelHistories.map((data) => (
            <div key={data._id}>
                <h5>{data.name}</h5>
                <h6>{data.email}</h6>
            </div>
        ))}
      </>
    );
  }
};

export default TravelHistories;

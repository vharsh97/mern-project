import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../App";

const CreateTravelHistory = () => {
  const [allDestinations, setAllDestinations] = useState();

  //function to get all destinations
  const getAllDestinatons = async () => {
    try {
      const response = await axios.get(`${baseurl}/destination`);
      if (response.status === 200) {
        setAllDestinations(response.data.destinations);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllDestinatons();
  }, []);

  return (
    <div>
      {allDestinations &&
        allDestinations.map((destination) => (
          <div key={destination._id}>
            <h5>{destination.name}</h5>
            <h5>{destination.pricePerPerson}</h5>
          </div>
        ))}
    </div>
  );
};

export default CreateTravelHistory;

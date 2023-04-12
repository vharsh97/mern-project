import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Button, Grid, Stack, Typography } from "@mui/material";
import CommonHeader from "./CommonHeader";
import { baseurl } from "../App";
import { StyledCenteredGrid } from "./CustomStyledComponents.styles";
import CardComponent from "./CardComponent";

const UserTravelHistory = () => {
  const [userTravelHistory, setUserTravelHistory] = useState();

  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  //function to fetch user travel history
  const getUsersTravelHistory = async () => {
    try {
      const response = await axios.get(`${baseurl}/user/${id}`);
      if (response.status === 200) {
        setUserTravelHistory(response.data.users);
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  useEffect(() => {
    getUsersTravelHistory();
  }, []);

  if (userTravelHistory && userTravelHistory.travelHistory.length <= 0) {
    return (
      <>
        <CommonHeader>
          <Button color="inherit" onClick={() => navigate("/")}>
            View All Submissions
          </Button>
        </CommonHeader>
        <StyledCenteredGrid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <h2>No Travel Histories Found for {userTravelHistory.name}</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
            >
              View All Submissions
            </Button>
          </Stack>
        </StyledCenteredGrid>
      </>
    );
  }

  if (userTravelHistory && userTravelHistory.travelHistory.length > 0) {
    return (
      <>
        <CommonHeader>
          <Button color="inherit" onClick={() => navigate("/")}>
            View All Submissions
          </Button>
        </CommonHeader>
        <Grid container spacing={2} alignItems="center" padding={3}>
          <Grid item xs={12}>
            <Typography variant="h4">
              {userTravelHistory.name.charAt(0).toUpperCase() +
                userTravelHistory.name.slice(1)}{" "}
              Travel History
            </Typography>
          </Grid>
          {userTravelHistory.travelHistory.map((data) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={data._id}>
              <CardComponent date={data.createdAt}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  align="center"
                >
                  Destination: {data.destination.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  Budget per person: ${data.destination.pricePerPerson}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  No. of travellers: {data.numberOfPersons}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  Total Budget: $
                  {data.destination.pricePerPerson * data.numberOfPersons}
                </Typography>
              </CardComponent>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
};

export default UserTravelHistory;

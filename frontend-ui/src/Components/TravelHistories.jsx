import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stack, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { baseurl } from "../App";
import { StyledCenteredGrid } from "./CustomStyledComponents.styles";
import CommonHeader from "./CommonHeader";
import CardComponent from "./CardComponent";

const TravelHistories = () => {
  const [travelHistories, setTravelHistories] = useState();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  //function to fetch all travel histories for all users
  const getAllTravelHistories = async () => {
    try {
      const response = await axios.get(`${baseurl}/user`);
      if (response.status === 200) {
        setTravelHistories(response.data.users);
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
    getAllTravelHistories();
  }, []);

  if (travelHistories && travelHistories.length <= 0) {
    return (
      <>
        <CommonHeader>
          <Button
            color="inherit"
            onClick={() => navigate("/create-travel-history")}
          >
            Create New Travel History
          </Button>
        </CommonHeader>
        <StyledCenteredGrid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <h2>No Travel Histories Found</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/create-travel-history")}
            >
              Create New Travel History
            </Button>
          </Stack>
        </StyledCenteredGrid>
      </>
    );
  }

  if (travelHistories && travelHistories.length > 0) {
    return (
      <>
        <CommonHeader>
          <Button
            color="inherit"
            onClick={() => navigate("/create-travel-history")}
          >
            Create New Travel History
          </Button>
        </CommonHeader>
        <Grid container spacing={2} alignItems="center" padding={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Travel Histories</Typography>
          </Grid>
          {travelHistories.map((data) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={data._id}
              onClick={() => navigate(`/user-travel-history/${data._id}`)}
            >
              <CardComponent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  align="center"
                >
                  {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {data.email}
                </Typography>
              </CardComponent>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
};

export default TravelHistories;

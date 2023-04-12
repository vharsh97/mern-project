//import dependecies
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Stack,
  Grid,
  FormGroup,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
  Typography,
  Button,
  OutlinedInput,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { baseurl } from "../App";
import { StyledCenteredGrid } from "./CustomStyledComponents.styles";
import CommonHeader from "./CommonHeader";

//Yup validation schema for user input form
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Must be a valid email address")
    .required("Email address is required"),
  destinationName: Yup.string().required("Destination name is required"),
  numberOfPersons: Yup.number()
    .min(1)
    .required("Number of persons is required"),
});

const CreateTravelHistory = () => {
  const [allDestinations, setAllDestinations] = useState();
  const [pricePerPerson, setPricePerPerson] = useState(0);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      destinationName: "",
      numberOfPersons: 1,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const body = { ...values, pricePerPerson: pricePerPerson };

      console.log(body);

      // API call to submit the details
      try {
        const response = await axios.post(
          `${baseurl}/user/create/travel-history`,
          body
        );
        if (response.status === 201) {
          console.log("Posted Successfully");
          enqueueSnackbar("Successfully Submitted !!", {
            variant: "success",
            autoHideDuration: 3000,
          });
          resetForm();
          setPricePerPerson(0);
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    },
  });

  const { values, handleChange, handleSubmit, errors, touched } = formik;

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

  //set price per person on selection of destination drom drop down
  const handleDestinationChange = (event) => {
    const optionValue = event.target.value;
    formik.setFieldValue("destinationName", optionValue);

    // update price per person based on destination selected
    const budget = allDestinations.find(
      (data) => data.name.toLowerCase() === optionValue.toLowerCase()
    );
    if (budget) {
      setPricePerPerson(budget.pricePerPerson);
    }
  };

  useEffect(() => {
    getAllDestinatons();
  }, []);

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
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            New Travel History
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Stack spacing={2} justifyContent="center">
                <FormControl
                  error={touched.name && Boolean(errors.name)}
                  variant="outlined"
                  fullWidth
                >
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <OutlinedInput
                    id="name"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  <FormHelperText>{touched.name && errors.name}</FormHelperText>
                </FormControl>
                <FormControl
                  error={touched.email && Boolean(errors.email)}
                  variant="outlined"
                  fullWidth
                >
                  <InputLabel htmlFor="email">Email address </InputLabel>
                  <OutlinedInput
                    id="email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <FormHelperText>
                    {touched.email && errors.email}
                  </FormHelperText>
                </FormControl>
                <FormControl variant="outlined">
                  <InputLabel id="destination-label">
                    Where do you want to go?{" "}
                  </InputLabel>
                  <Select
                    id="destinationName"
                    name="destinationName"
                    label="Where do you want to go?"
                    labelId="destination-label"
                    value={formik.values.destinationName}
                    onChange={handleDestinationChange}
                    error={
                      formik.touched.destinationName &&
                      Boolean(formik.errors.destinationName)
                    }
                  >
                    {allDestinations &&
                      allDestinations.map((data) => (
                        <MenuItem value={data.name} key={data._id}>
                          {data.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {formik.touched.destinationName &&
                    formik.errors.destinationName && (
                      <div
                        style={{
                          color: "#d32f2f",
                          fontSize: "0.75rem",
                          marginTop: "0.25rem",
                        }}
                      >
                        {formik.errors.destinationName}
                      </div>
                    )}
                </FormControl>

                <Stack
                  spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <FormControl
                    error={
                      touched.numberOfPersons && Boolean(errors.numberOfPersons)
                    }
                    variant="outlined"
                    fullWidth
                    sx={{ width: "70%" }}
                  >
                    <InputLabel htmlFor="numberOfPersons">
                      No. of travellers
                    </InputLabel>
                    <OutlinedInput
                      id="numberOfPersons"
                      type="number"
                      name="numberOfPersons"
                      value={values.numberOfPersons}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {touched.numberOfPersons && errors.numberOfPersons}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    fullWidth
                    sx={{ width: "30%" }}
                  >
                    <InputLabel htmlFor="pricePerPerson">
                      Budget per person
                    </InputLabel>
                    <OutlinedInput
                      id="pricePerPerson"
                      type="number"
                      name="pricePerPerson"
                      value={pricePerPerson}
                      disabled
                      readOnly
                    />
                  </FormControl>
                </Stack>

                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Stack>
            </FormGroup>
          </form>
        </Grid>
      </StyledCenteredGrid>
    </>
  );
};

export default CreateTravelHistory;

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/action";
import { errorAlert, successAlert } from "../utils/Swal";
import { useNavigate } from "react-router-dom";
const defaultTheme = createTheme();
const initialValues = {
  userName: "",
  password: "",
  gender: "",
  references: "",
  city: "",
  state: "",
  phoneNumber: "",
  email: "",
};
const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerData, error } = useSelector((state) => state?.userReducer);
  const cities = ["Mumbai", "Pune", "Ahmedabad"];
  const referencesOptions = ["LinkedIn", "Friends", "JobPortal", "Others"];
  const stateOptions = ["  Gujarat", "Maharashtra", "Karnataka"];
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    phoneNumber: Yup.number().required("PhoneNumber is required"),
    userName: Yup.string().required("Username is required"),
    gender: Yup.string().required("Gender is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("Select a state"),
    references: Yup.string().required("Select a reference"),
  });

  const handleSubmit = (values) => {
    dispatch(register(values));
  };
  console.log(registerData, error);
  React.useEffect(() => {
    if (error === false) {
      if (registerData?.status === "success") {
        successAlert("Success", "you have successfully registerd please login");
        navigate("/");
      }
    } else if (error === true) {
      errorAlert("Failed", "some-thing went wrong");
    }
  }, [registerData, error]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            marginBottom: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue, values }) => (
              <Form noValidate>
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="userName"
                  label="userName"
                  name="userName"
                  autoComplete="userName"
                  autoFocus
                  error={errors.userName && touched.userName}
                  helperText={
                    errors.userName && touched.userName && errors.userName
                  }
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={errors.password && touched.password}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="phoneNumber"
                  label="phoneNumber"
                  type="number"
                  id="phoneNumber"
                  error={errors.phoneNumber && touched.phoneNumber}
                  helperText={
                    errors.phoneNumber &&
                    touched.phoneNumber &&
                    errors.phoneNumber
                  }
                />
                <Field name="gender">
                  {({ field }) => (
                    <FormControl
                      component="fieldset"
                      error={errors.gender && touched.gender}
                    >
                      <FormLabel component="legend">Gender</FormLabel>
                      <RadioGroup {...field}>
                        <Box>
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                          <FormControlLabel
                            value="others"
                            control={<Radio />}
                            label="Others"
                          />
                        </Box>
                      </RadioGroup>
                      {errors.gender && touched.gender && (
                        <FormHelperText>{errors.gender}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                </Field>
                <InputLabel id="demo-select-small-label">City</InputLabel>
                <Field
                  name="city"
                  as={Select}
                  select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  fullWidth
                  required
                  label="City"
                  error={errors.city && touched.city}
                  helperText={errors.city && touched.city && errors.city}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <MenuItem value="">
                    <em>Select City</em>
                  </MenuItem>
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Field>
                <Field name="references">
                  {({ field }) => (
                    <FormControl
                      error={errors.references && touched.references}
                      component="fieldset"
                    >
                      <FormLabel component="legend">Reference</FormLabel>
                      <FormGroup className="from_grp">
                        {referencesOptions.map((option) => (
                          <FormControlLabel
                            key={option}
                            control={
                              <Checkbox
                                checked={values.references === option}
                                onChange={(e) =>
                                  setFieldValue(
                                    "references",
                                    e.target.checked ? option : ""
                                  )
                                }
                                color="primary"
                              />
                            }
                            label={option}
                          />
                        ))}
                      </FormGroup>
                      {errors.references && touched.references && (
                        <FormHelperText>{errors.references}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                </Field>
                <Field name="state">
                  {({ field }) => (
                    <FormControl
                      error={errors.state && touched.state}
                      fullWidth
                      required
                    >
                      <Autocomplete
                        {...field}
                        options={stateOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="State"
                            error={!!errors.state && touched.state}
                            helperText={
                              errors.state && touched.state && errors.state
                            }
                          />
                        )}
                        value={values.state}
                        onChange={(_, newValue) => {
                          setFieldValue("state", newValue || ""); // Set the selected state
                        }}
                      />
                    </FormControl>
                  )}
                </Field>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/" variant="body2">
                      {"you already have an account? Sign in"}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterPage;

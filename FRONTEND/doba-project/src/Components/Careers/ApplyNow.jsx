import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { userURL } from "../../Base/Constent";
import { ToastContainer, toast } from "react-toastify";

function ApplyNow({ job }) {
  const [isSubmitting, setSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    position: Yup.string().required("Please select an option"),
    workingExperience: Yup.number().required("Working experience is required"),
    prevcompany: Yup.string().required("Previous company is required"),
  });
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  // const handleSubmit = async (values, { resetForm }) => {
  //   try {
  //     // Set submitting state to true
  //     setSubmitting(true);
  //     const res = await axios
  //       .post(`${userURL}/careers/apply`, { values })
  //       .then((res) => {
  //         // Handle success or error
  //         toast.success("Form submitted successfully", {
  //           position: "top-right",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //         });

  //         resetForm();
  //       })
  //       .catch((error) => {
  //         console.error("form adding error:", error);
  //       });
  //     console.log(res.data);
  //     alert("Application Submitted Successfully");
  //     resetForm();
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "ed631061-a1d6-4ca3-bdcf-a9401869b244");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
     alert  ("Success", res);
    }
  };

  return (
    <div className="container py-24">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <div className="text-center w-full py-10">
        <span className="font-bold underline">Apply Now</span>
      </div>
      <Formik
        initialValues={{
          name: "",
          address: "",
          phone: "",
          email: "",
          position: "Yes",
          workingExperience: "",
          prevcompany: "",
          title: job.title || "",
          resume: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3 md:flex gap-10">
              <Field
                type="text"
                label="Name"
                name="name"
                variant="outlined"
                className="w-[100%] "
                as={TextField}
                error={errors.name && touched.name}
                helperText={errors.name && touched.name && errors.name}
              />
              <Field
                type="text"
                label="Address"
                name="address"
                variant="outlined"
                className="w-[100%] "
                as={TextField}
                error={errors.address && touched.address}
                helperText={errors.address && touched.address && errors.address}
              />
            </div>
            <div className="mb-3 md:flex gap-10">
              <Field
                type="tel"
                label="Phone"
                name="phone"
                variant="outlined"
                className="w-[100%] "
                as={TextField}
                error={errors.phone && touched.phone}
                helperText={errors.phone && touched.phone && errors.phone}
              />
              <Field
                type="email"
                label="Email"
                name="email"
                variant="outlined"
                className="w-[100%] "
                as={TextField}
                error={errors.email && touched.email}
                helperText={errors.email && touched.email && errors.email}
              />
            </div>
            <div className="py-5">
              <div className="text-center mb-5">
                <span className="font-bold">Your Working Experience</span>
              </div>
              <div className="mb-3 md:flex gap-10">
                <FormControl
                  error={errors.position && touched.position}
                  component="fieldset"
                >
                  <FormLabel component="legend">
                    Is This Your First Job
                  </FormLabel>
                  <Field
                    as={RadioGroup}
                    aria-labelledby="demo-form-control-label-placement"
                    name="position"
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                      labelPlacement="start"
                    />
                  </Field>
                  {errors.position && touched.position && (
                    <span className="text-red-500">{errors.position}</span>
                  )}
                </FormControl>
              </div>
              <div className="mb-3 md:flex gap-10">
                <Field
                  type="number"
                  label="Working Experience"
                  name="workingExperience"
                  variant="outlined"
                  className="w-[100%] "
                  as={TextField}
                  error={errors.workingExperience && touched.workingExperience}
                  helperText={
                    errors.workingExperience &&
                    touched.workingExperience &&
                    errors.workingExperience
                  }
                />
                <Field
                  type="text"
                  label="Previous Company"
                  name="prevcompany"
                  variant="outlined"
                  className="w-[100%] "
                  as={TextField}
                  error={errors.prevcompany && touched.prevcompany}
                  helperText={
                    errors.prevcompany &&
                    touched.prevcompany &&
                    errors.prevcompany
                  }
                />
              </div>
              <div className="md:flex gap-10 items-center justify-center mb-4">
                <Field
                  type="text"
                  label="Appled for"
                  name="title"
                  variant="outlined"
                  className="w-[100%] "
                  as={TextField}
                  id="outlined-read-only-input"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Resume
                  <VisuallyHiddenInput
                    accept=".pdf"
                    type="file"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      setFieldValue("resume", file); // Update Formik field value for resume
                    }}
                  />
                </Button>
              </div>
              <div className="flex items-center justify-center">
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  endIcon={<SendIcon />}
                >
                  {isSubmitting ? "Loading..." : "Send"}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ApplyNow;

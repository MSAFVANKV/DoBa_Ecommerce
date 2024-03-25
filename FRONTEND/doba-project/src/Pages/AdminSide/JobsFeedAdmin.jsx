import React from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminbaseURL } from "../../Base/Constent";

function JobsFeedAdmin() {
  const initialValues = {
    title: "",
    department: "",
    location: "",
    education: "",
    experience: "",
    skills: "",
    responsibilities: "",
    additionalRequirements: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      axios
        .post(`${adminbaseURL}/careers/jobs/upload`, values)
        .then((res) => {
          if (res.data.msg) {
            alert("job error");
          } else {
            toast.success("Form submitted successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            formik.resetForm();
          }
        })
        .catch((error) => {
          console.error("form adding error:", error);
        });
    },
  });

  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
      <ToastContainer />
      <button
        className="p-3 rounded-2xl active:scale-95 transition-all bg-main text-white font-semibold hover:bg-none"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Hire a new employee
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog" onSubmit={formik.handleSubmit}>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-5">
              <TextField
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.title}
                name="title"
                label="Job Title"
              />
              <TextField
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.department}
                name="department"
                label="Department"
              />
              <TextField
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.location}
                name="location"
                label="Location"
              />
              <TextField
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.education}
                name="education"
                label="Education"
              />
              <TextField
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.experience}
                name="experience"
                label="Experience"
              />
              <TextField
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.skills}
                name="skills"
                label="Skills"
              />
              <TextField
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.responsibilities}
                name="responsibilities"
                label="Responsibilities"
              />
              <TextField
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.additionalRequirements}
                name="additionalRequirements"
                label="Additional Requirements"
              />
              
              <Button type="submit" variant="contained">
                Feed Jobs
              </Button>
            </div>
          </form>
          <p className="py-10">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </div>
  );
}

export default JobsFeedAdmin;

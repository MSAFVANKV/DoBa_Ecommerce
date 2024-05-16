import React, { useEffect, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminbaseURL } from "../../Base/Constent";
import { CareerJobsSchema } from "../../ValidationSchema/SignUpSchema";

function JobsFeedAdmin(updateJobs) {
  const [skills, setSkills] = useState([]);
  const modalRef = useRef(null);

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


  // useEffect(() => {
  //   formik.setValues({
  //     ...formik.values,
  //     skills: skills.join(", "),
  //   });
  // }, [skills]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CareerJobsSchema,
    onSubmit: (values) => {
      axios
        .post(`${adminbaseURL}/careers/jobs/upload`, values)
        .then((res) => {
          console.log(res.data, "hhh");
          if (res.data.submission === false) {
            alert(res.data.msg);
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
            updateJobs();
          }
        })
        .catch((error) => {
          console.error("form adding error:", error);
        });
    },
  });

  const addSkill = () => {
    if (formik.values.skills.trim() !== "") {
      setSkills([...skills, formik.values.skills]);
      
    }
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const closeModal = () => {
    modalRef.current.close();
    formik.resetForm();
  };

  return (
    <div className="flex justify-center items-center w-full ">
      {/* <ToastContainer /> */}
      <div className="relative">
        <button className="p-3 rounded-2xl active:scale-95 shadow-xl transition-all  bg-black text-white font-semibold hover:bg-none">
          Hire a new employee
        </button>
        <button
          className="p-3 absolute rounded-2xl  active:scale-95 shadow-xl transition-all bg-main right-0 translate-x-1 translate-y-1 text-white font-semibold hover:bg-none"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Hire a new employee
        </button>
      </div>
      <dialog id="my_modal_3" className="modal" ref={modalRef}>
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>
          <form method="dialog" onSubmit={formik.handleSubmit} className="relative">
            <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-5">
              <TextField
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                name="title"
                label="Job Title"
              />
              <TextField
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.department}
                error={
                  formik.touched.department && Boolean(formik.errors.department)
                }
                helperText={
                  formik.touched.department && formik.errors.department
                }
                name="department"
                label="Department"
              />
              <TextField
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.location}
                error={
                  formik.touched.location && Boolean(formik.errors.location)
                }
                helperText={formik.touched.location && formik.errors.location}
                name="location"
                label="Location"
              />
              <TextField
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.education}
                error={
                  formik.touched.education && Boolean(formik.errors.education)
                }
                helperText={formik.touched.education && formik.errors.education}
                name="education"
                label="Education"
              />
              <TextField
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.experience}
                error={
                  formik.touched.experience && Boolean(formik.errors.experience)
                }
                helperText={
                  formik.touched.experience && formik.errors.experience
                }
                name="experience"
                label="Experience"
              />
              

              <TextField
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.responsibilities}
                error={
                  formik.touched.responsibilities &&
                  Boolean(formik.errors.responsibilities)
                }
                helperText={
                  formik.touched.responsibilities &&
                  formik.errors.responsibilities
                }
                name="responsibilities"
                label="Responsibilities"
              />
              <TextField
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.additionalRequirements}
                error={
                  formik.touched.additionalRequirements &&
                  Boolean(formik.errors.additionalRequirements)
                }
                helperText={
                  formik.touched.additionalRequirements &&
                  formik.errors.additionalRequirements
                }
                name="additionalRequirements"
                label="Additional Requirements"
              />
              <div className="">
                <TextField
                  variant="standard"
                  onChange={formik.handleChange}
                  value={formik.values.skills}
                  error={formik.touched.skills && Boolean(formik.errors.skills)}
                  helperText={formik.touched.skills && formik.errors.skills}
                  name="skills"
                  label="Skills"
                />
                {/* <button
                  type="button"
                  className="btn p-2 bg-blue-900 text-white font-semibold"
                  onClick={addSkill}
                >
                  +
                </button> */}
                {skills.length > 0 && (
                  <div className="bg-slate-400 z-50 absolute left-0 max-w-[35%]  overflow-x-scroll overflow-y-hidden scrollbar-none bottom-0 h-10 flex items-center gap-1 rounded-lg text-black">
                    <span className="text-white font-bold">skills: </span>
                    {skills.map((skill, index) => (
                      <div key={index} className="flex items-center">
                        <span> {skill}</span>
                        <button
                          className="ml-1"
                          onClick={() => handleDeleteSkill(index)}
                        >
                          <span>*</span>
                        </button>

                        {index !== skills.length - 1 && <span>,</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Display selected skills */}

              <Button type="submit" variant="contained" className={`${skills? "mb-1" :""}`}>
                Feed Jobs
              </Button>
            </div>
          </form>
          <p className="pt-10">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </div>
  );
}

export default JobsFeedAdmin;

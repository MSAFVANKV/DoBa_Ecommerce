import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import useWeb3Forms from "@web3forms/react";

function ApplyNow({ job }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  
  // ed631061-a1d6-4ca3-bdcf-a9401869b244
  const apiKey = "51250e50-7d71-43a1-b74d-5c5eeeef7e2f";

  const { submit: onSubmit } = useWeb3Forms({
    access_key: apiKey,
    settings: {
      from_name: "Acme Inc",
      subject: "New Contact Message from your Website",
    },
    onSuccess: (msg, data) => {
      console.log("data",data)
      setIsSuccess(true);
      setMessage(msg);
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setMessage(msg);
    },
  });

 

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

      <form onSubmit={handleSubmit(onSubmit)} className="my-10">
        <input
          type="checkbox"
          id=""
          className="hidden"
          style={{ display: "none" }}
          {...register("botcheck")}
        ></input>

        <div className="mb-5 flex md:flex-row flex-col gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Full Name"
              autoComplete="false"
              className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 ${
                errors.name
                  ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                  : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
              }`}
              {...register("name", {
                required: "Full name is required",
                maxLength: 80,
              })}
            />
            {errors.name && (
              <div className="mt-1 text-red-600">
                <small>{errors.name.message}</small>
              </div>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="email_address" className="sr-only">
              Email Address
            </label>
            <input
              id="email_address"
              type="email"
              placeholder="Email Address"
              name="email"
              autoComplete="false"
              className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 ${
                errors.email
                  ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                  : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
              }`}
              {...register("email", {
                required: "Enter your email",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors.email && (
              <div className="mt-1 text-red-600">
                <small>{errors.email.message}</small>
              </div>
            )}
          </div>
        </div>

        <div className="mb-5 flex md:flex-row flex-col gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Previous Company"
              autoComplete="false"
              className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 ${
                errors.prevCompany
                  ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                  : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
              }`}
              {...register("prevCompany", {
                required: "Previous Company is required",
                maxLength: 80,
              })}
            />
            {errors.prevCompany && (
              <div className="mt-1 text-red-600">
                <small>{errors.prevCompany.message}</small>
              </div>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="year_exp" className="sr-only">
              Year Of Experience
            </label>
            <input
              id="year_exp"
              type="number"
              placeholder="Year Of Experience"
              name="Experience"
              autoComplete="false"
              className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 ${
                errors.experience
                  ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                  : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
              }`}
              {...register("experience", {
                required: "Enter your Experience",
              })}
            />
            {errors.experience && (
              <div className="mt-1 text-red-600">
                <small>{errors.experience.message}</small>
              </div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <textarea
            name="message"
            placeholder="Your Message"
            className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white dark:placeholder:text-gray-200 dark:bg-gray-900 rounded-md outline-none h-36 focus:ring-4 ${
              errors.message
                ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
            }`}
            {...register("message", {
              required: "Enter your Message",
            })}
          />
          {errors.message && (
            <div className="mt-1 text-red-600">
              {" "}
              <small>{errors.message.message}</small>
            </div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="file"
            accept=".pdf"
            className="w-full px-4 py-3 border-2 rounded-md outline-none"
            {...register("pdf", {
              required: "Please upload your PDF resume",
            })}
            // onChange={handleFileUpload}
          />
          {errors.pdf && (
            <div className="mt-1 text-red-600">
              {" "}
              <small>{errors.pdf.message}</small>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black "
        >
          {isSubmitting ? (
            <svg
              className="w-5 h-5 mx-auto text-white dark:text-black animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Send Message"
          )}
        </button>
      </form>

      {isSubmitSuccessful && isSuccess && (
        <div className="mt-3 text-sm text-center text-green-500">
          {message || "Success. Message sent successfully"}
        </div>
      )}
      {isSubmitSuccessful && !isSuccess && (
        <div className="mt-3 text-sm text-center text-red-500">
          {message || "Something went wrong. Please try later."}
        </div>
      )}
    </div>
  );
}

export default ApplyNow;
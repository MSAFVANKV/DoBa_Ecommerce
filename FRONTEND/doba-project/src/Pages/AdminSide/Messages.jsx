import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { adminbaseURL, userURL } from '../../Base/Constent';
import { formsingle, markMessageAsRead } from '../../ReduxToolKit/User/SingleFormSlice';
import { useDispatch, useSelector } from 'react-redux';
import SinglePurchase from './AllMessages/SinglePurchase';
import { confirmAlert } from 'react-confirm-alert'; // Import the confirmation alert library
import 'react-confirm-alert/src/react-confirm-alert.css';
// icons
import { AiFillDelete } from 'react-icons/ai';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { SlRefresh } from "react-icons/sl";

function Messages() {
  const [enquiry1, setEnquiry1] = useState(true);
  const [enquiry2, setEnquiry2] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [checked, setChecked] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const dispatch = useDispatch();
  // =================================

  const SingleFormCollections = useSelector(state => state.form.form);
  // console.log(SingleFormCollections, 'SingleFormCollections');

  useEffect(() => {
    axios.get(`${userURL}/singleform/getall`, { withCredentials: true })
      .then((response) => {
        dispatch(formsingle(response.data));
        console.log(response.data);
      })
  }, [dispatch]);
  // =================================
  const refreshMessages = () => {
    axios.get(`${userURL}/singleform/getall`, { withCredentials: true })
      .then((response) => {
        dispatch(formsingle(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error refreshing messages:', error);
      });
  };

  // =================================

  const openSingeForm = () => {
    setEnquiry1(true);
    setEnquiry2(false);
    setShowMessages(false);
  };

  const enquiyForm = () => {
    setEnquiry1(false);
    setEnquiry2(true);
    setShowMessages(false);
  };

  // const showSingleMessage = (message) => {
  //   setEnquiry1(false);
  //   setShowMessages(true);
  //   setSelectedMessage(message);
  // };

  // =================================

  // Messages.jsx
  const showSingleMessage = (message) => {
    setEnquiry1(false);
    setShowMessages(true);
    setSelectedMessage(message);

    // Dispatch action to mark the message as read
    dispatch(markMessageAsRead(message._id));
  };
  // =================================


  const handleChecked = (isChecked, index) => {
    const checkedItems = [...checked];
    checkedItems[index] = isChecked;
    setChecked(checkedItems);
  };

  // select all checkbox
  const handleSelectAll = (isAllChecked) => {
    if (SingleFormCollections && SingleFormCollections.length > 0) {
      const newChecked = SingleFormCollections.map(() => isAllChecked);
      setChecked(newChecked);
    } else {
      setChecked([]); // Set to an empty array when there are no messages
    }
  };

  const isAllCheckboxesChecked = checked.every((isChecked) => isChecked);
  const isAnyCheckboxChecked = checked.some((isChecked) => isChecked);
  // =================================

  const removeMessage = (id, e) => {
    // Prevent event propagation
    e.stopPropagation();

    axios.delete(`${userURL}/form/delete/${id}`)
      .then((res) => {
        dispatch(formsingle()); // Fetch updated tasks
      })
      .catch((error) => {
        console.error('Error deleting message:', error);
      });
  };
  // =================================
  const handleDeleteAll = () => {
    if (isAnyCheckboxChecked) {
      // Show confirmation alert
      confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure you want to delete all selected messages?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => onDeleteAll(),
          },
          {
            label: 'No',
            onClick: () => { /* Do nothing if user clicks No */ },
          },
        ],
      });
    } else {
      // Show alert if no checkboxes are selected
      alert('Please select messages to delete.');
    }
  };

  const onDeleteAll = () => {
    // Implement the logic to delete all selected messages in the database
    // Make a request to your server to delete the selected messages
    const selectedIds = SingleFormCollections
      .filter((_, index) => checked[index])
      .map((message) => message._id);

    axios.post(`${userURL}/form/deleteAll`, { ids: selectedIds })
      .then(() => {
        dispatch(formsingle()); // Fetch updated tasks
      })
      .catch((error) => {
        console.error('Error deleting messages:', error);
      });
  };
  return (
    <div className="">
      <div className="w-[100%] sm:flex bg-[#F6F8FC] p-5">
        <div className="w-[20%] md:block hidden">
          <div className="w-[80%] ">
            {/* selection list */}
            <ul className="">
              <li
                className={`p-2 my-2 font-light hover:bg-slate-200 cursor-pointer rounded-lg ${enquiry1 || showMessages ? 'bg-slate-300 hover:bg-slate-300' : ''}`}
                onClick={openSingeForm}
              >
                SinglePurchase
                {SingleFormCollections && SingleFormCollections.length > 0 && (
                  <span className="float-right ">
                    {SingleFormCollections.length.toLocaleString()}
                  </span>
                )}
              </li>
              <li
                className={`p-2 font-light hover:bg-slate-200 cursor-pointer rounded-lg ${enquiry2 ? 'bg-slate-300 hover:bg-slate-300' : ''}`}
                onClick={enquiyForm}
              >
                Enquiry Form
              </li>
            </ul>
            {/* selection list ends*/}
          </div>
        </div>
        {/* second div start */}
        <div className="sm:w-[80%] h-[100vh] overflow-y-auto scroll-smooth flex justify-center w-[100%]">
          {enquiry1 && (
            <div className="w-[100%] bg-white rounded-2xl">
              <ul>
                {/* all selection */}
                <div className="m-5 pb-5 border-b flex justify-between">
                  {/* refresh pagestart */}
                  <div className="hover:bg-slate-200 rounded-full p-2 transition-all duration-500">
                    <SlRefresh className=' cursor-pointer  ' onClick={refreshMessages} />
                  </div>

                  {/* refresh ends */}

                  {/* Delete all start */}

                  <div className="hover:bg-slate-200 rounded-full p-2 transition-all duration-500">
                    <button className='float-right text-[1.5rem] hover:text-red-600' onClick={handleDeleteAll}>
                      <MdOutlineDeleteSweep />
                    </button>
                  </div>
                  {/* Delete all start */}

                </div>
                {SingleFormCollections && SingleFormCollections.length === 0 && (
                  <div className="flex justify-center items-center">
                    <p className=''>No messages yet</p>
                  </div>
                )}
                {SingleFormCollections && SingleFormCollections.length > 0 &&
                  SingleFormCollections.map((message, index) => (
                    <div
                      className={`flex items-center hover:bg-slate-200 hover:shadow-inner cursor-pointer p-2 border-b-[0.1rem] ${message.read ? 'font-normal' : 'font-bold'} `}
                      key={message._id}
                      onClick={(e) => {
                        // Check if the clicked element is not the checkbox
                        if (e.target.tagName.toLowerCase() !== 'input') {
                          showSingleMessage(message);
                        }
                      }}
                    >
                      {/* Radio Button */}
                      <input
                        type="checkbox"
                        name="selectedMessage"
                        value={message._id}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleChecked(e.target.checked, index);
                        }}
                        checked={checked[index] || false}
                      />
                      {/* Full Name */}
                      <span className={`ms-2 `}>{message.fullName}</span>

                      {/* Command (showing only first 10 characters followed by '...') */}
                      <span className="ms-5 sm:block hidden">
                        {message.command.substring(0, 50)}
                        {message.command.length > 50 ? '...' : ''}
                      </span>
                      {/* Sent Date and Time */}
                      <span className=" sm:block hidden ml-auto text-gray-500">
                        {new Date(message.sentAt).toLocaleString()}
                      </span>
                      {/* Delete Button */}
                      {checked[index] && (
                        <button
                          className="ml-auto"
                          onClick={(e) => removeMessage(message._id, e)}
                        >
                          <AiFillDelete />
                        </button>

                      )}
                    </div>
                  ))}
              </ul>
            </div>
          )}

          {showMessages && <SinglePurchase selectedItem={selectedMessage} />}

          {enquiry2 && (
            <div className="w-[100%] bg-white rounded-2xl">
              enquiry2
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;

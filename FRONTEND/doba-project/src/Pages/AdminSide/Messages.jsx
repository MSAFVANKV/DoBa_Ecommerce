// Messages.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { userURL } from '../../Base/Constent';
import { formsingle } from '../../ReduxToolKit/User/SingleFormSlice';
import { useDispatch, useSelector } from 'react-redux';
import SinglePurchase from './AllMessages/SinglePurchase';

// icons
import { AiFillDelete } from 'react-icons/ai';
import { MdOutlineDeleteSweep } from 'react-icons/md';

function Messages() {
  const [enquiry1, setEnquiry1] = useState(true);
  const [enquiry2, setEnquiry2] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [checked, setChecked] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const dispatch = useDispatch();

  const SingleFormCollections = useSelector((state) => state.form.form);

  useEffect(() => {
    axios.get(`${userURL}/singleform/getall`, { withCredentials: true }).then((response) => {
      dispatch(formsingle(response.data));
    });
  }, [dispatch]);

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

  const showSingleMessage = (message) => {
    setEnquiry1(false);
    setShowMessages(true);
    setSelectedMessage(message);
  };

  const handleChecked = (index, isChecked) => {
    const checkedItems = [...checked];
    checkedItems[index] = isChecked;
    setChecked(checkedItems);
  };

  const handleSelectAll = (isAllChecked) => {
    const newChecked = SingleFormCollections.map(() => isAllChecked);
    setChecked(newChecked);
  };

  const isAllCheckboxesChecked = checked.every((isChecked) => isChecked);
  const isAnyCheckboxChecked = checked.some((isChecked) => isChecked);

  return (
    <div className=''>
      <div className='w-[100%] sm:flex bg-[#F6F8FC] p-5'>
        <div className='w-[20%] '>
          <div className='w-[80%] '>
            <ul className=''>
              <li
                className={`p-2 my-2 font-light hover:bg-slate-200 cursor-pointer rounded-lg ${
                  enquiry1 ? 'bg-slate-300 hover:bg-slate-300' : ''
                }`}
                onClick={openSingeForm}
              >
                SinglePurchase
              </li>
              <li
                className={`p-2 font-light hover:bg-slate-200 cursor-pointer rounded-lg ${
                  enquiry2 ? 'bg-slate-300 hover:bg-slate-300' : ''
                }`}
                onClick={enquiyForm}
              >
                Enquiry Form
              </li>
            </ul>
          </div>
        </div>
        <div className='sm:w-[80%] flex justify-center w-[100%] '>
          {enquiry1 && (
            <div className='w-[100%] bg-white rounded-2xl h-[100vh]'>
              <table className='w-full table-auto text-start'>
                <thead>
                  <tr className='text-star'>
                    <th className='border-b p-2 w-[10px]'>
                      <input
                        type='checkbox'
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        checked={isAllCheckboxesChecked}
                      />{' '}
                      Select all
                    </th>
                    <th className='border-b p-2'></th>
                    <th className='border-b p-2'></th>
                    <th className='border-b p-2'>
                      {isAllCheckboxesChecked && <button><MdOutlineDeleteSweep/></button>}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SingleFormCollections &&
                    SingleFormCollections.map((message, index) => (
                      <tr
                        key={message._id}
                        className='hover:bg-slate-200 hover:shadow-inner cursor-pointer'
                        onClick={() => showSingleMessage(message)}
                      >
                        <td className='border-b p-2 w-[10px]'>
                          <input
                            type='checkbox'
                            onChange={(e) => handleChecked(index, e.target.checked)}
                            checked={checked[index] || false}
                          />
                        </td>
                        <td className='border-b p-2 w-[300px]'>{message.fullName}</td>
                        <td className='border-b sm:block hidden p-2'>
                          {message.command.substring(0, 50)}
                          {message.command.length > 50 ? '...' : ''}
                        </td>
                        <td className='border-b p-2'>
                          {checked[index] && (
                            <button className='' onClick={() => handleDelete(message._id)}>
                              <AiFillDelete/>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {showMessages && !isAnyCheckboxChecked && <SinglePurchase selectedItem={selectedMessage} />}

          {enquiry2 && (
            <div className='w-[100%] bg-white rounded-2xl'>enquiry2</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;

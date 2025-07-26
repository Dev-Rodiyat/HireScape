import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import api from '../app/api';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [jobType, setJobType] = useState('full-time');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [remote, setRemote] = useState(false);
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [currency, setCurrency] = useState('USD');

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const newJob = {
        title,
        description,
        location,
        remote,
        jobType,
        salaryRange: {
          min: Number(salaryMin),
          max: Number(salaryMax),
          currency,
        },
      };

      await api.post('/job/create-job', newJob); // adjust path if needed
      toast.success('Job added successfully');
      navigate('/employer/dashboard');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add job');
    }
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 shadow-md rounded-md border'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Add Job</h2>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Job Title</label>
              <input type='text' required className='border rounded w-full py-2 px-3'
                value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Job Type</label>
              <select required className='border rounded w-full py-2 px-3'
                value={jobType} onChange={(e) => setJobType(e.target.value)}>
                <option value='full-time'>Full-Time</option>
                <option value='part-time'>Part-Time</option>
                <option value='contract'>Contract</option>
                <option value='internship'>Internship</option>
                <option value='remote'>Remote</option>
                <option value='hybrid'>Hybrid</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Location</label>
              <input type='text' required className='border rounded w-full py-2 px-3'
                value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>

            <div className='mb-4 flex items-center gap-2'>
              <input type='checkbox' id='remote' checked={remote}
                onChange={(e) => setRemote(e.target.checked)} />
              <label htmlFor='remote' className='text-gray-700'>Remote Option</label>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Description</label>
              <textarea required rows='5' className='border rounded w-full py-2 px-3'
                value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Salary Range</label>
              <div className='flex gap-4'>
                <input type='number' placeholder='Min' required className='border rounded w-full py-2 px-3'
                  value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} />
                <input type='number' placeholder='Max' required className='border rounded w-full py-2 px-3'
                  value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} />
              </div>
              <div className='mt-2'>
                <select className='border rounded py-2 px-3' value={currency}
                  onChange={(e) => setCurrency(e.target.value)}>
                  <option value='GBP'>NGN</option>
                  <option value='USD'>USD</option>
                  <option value='EUR'>EUR</option>
                  <option value='GBP'>GBP</option>
                </select>
              </div>
            </div>

            <div>
              <button className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full'
                type='submit'>Add Job</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddJob;

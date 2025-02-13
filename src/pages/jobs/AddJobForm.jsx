import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { FaImage } from "react-icons/fa6";

const AddJobForm = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyContactEmail, setCompanyContactEmail] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [jobType, setJobType] = useState('');
  const [requirements, setRequirements] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const token = useSelector((state) => state.user?.user?.token);
  const [successModal, setSuccessModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('jobTitle', jobTitle);
    formData.append('companyName', companyName);
    formData.append('companyDescription', companyDescription);
    formData.append('companyContactEmail', companyContactEmail);
    formData.append('companyLocation', companyLocation);
    formData.append('jobLocation', jobLocation);
    formData.append('minSalary', minSalary);
    formData.append('maxSalary', maxSalary);
    formData.append('experienceLevel', experienceLevel);
    formData.append('employmentType', employmentType);
    formData.append('educationLevel', educationLevel);
    formData.append('jobType', jobType);
    formData.append('requirements', requirements);
    formData.append('responsibilities', responsibilities);
    if (logo) {
      formData.append('logo', logo);
    }

    try {
      const response = await axios.post('https://jobify-kefc.onrender.com/api/jobs/postJob', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token 
        },
      });
      console.log('Job created:', response.data);
      // Clear form after successful submission
      setSuccessModal(true);
      resetForm();
    } catch (err) {
      console.error('Error creating job:', err);
      setError('Failed to create job. Please try again.');
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setPreview(URL.createObjectURL(file)); 
  };

  const resetForm = () => {
    setJobTitle('');
    setCompanyName('');
    setCompanyDescription('');
    setCompanyContactEmail('');
    setCompanyLocation('');
    setJobLocation('');
    setMinSalary('');
    setMaxSalary('');
    setExperienceLevel('');
    setEmploymentType('');
    setEducationLevel('');
    setJobType('');
    setRequirements('');
    setResponsibilities('');
    setLogo(null);
    setPreview(null);
  };

  return (
    <div>
  <form onSubmit={handleSubmit} className="md:px-[6%] mx-auto p-4 mt-16 ">
    <h2 className="text-2xl text-primary font-semibold mb-4">Create Job</h2>
    {error && <p className="text-red-500">{error}</p>}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* First Grid (Logo to Max Salary) */}
      <div className="flex flex-col gap-3">
        {/* Company Logo */}
        <div className="flex items-center gap-6 mb-6">
      {/* Company Logo */}
      <div>
       
        <div
          className="cursor-pointer w-32 h-32 flex items-center justify-center border border-gray-300 rounded-md mt-2"
          onClick={() => document.getElementById('logo').click()}
        >
          <input
            type="file"
            id="logo"
            onChange={handleLogoChange}
            className="hidden"
          />
          {preview ? (
            <img
              src={preview}
              alt="Logo Preview"
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <FaImage className="text-gray-400 text-6xl" />
          )}
        </div>
      </div>
      <div className="flex  w-full flex-col gap-6 mb-3">
      {/* Job Title */}
      <div className="form-input w-full sm:flex-1 relative">
      
        <input
          type="text"
          id="jobTitle"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
          className="input"
        />
          <label>
          Job Title
        </label>
      </div>
      <div className="form-input w-full sm:flex-1 relative">
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="input"
          />
          <label>Company Name</label>
        </div>
      </div>
    </div>

        {/* Company Name */}
       

        {/* Company Description */}
        <div className="form-input w-full sm:flex-1 relative">
          <textarea
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            required
             className="input min-h-32"
            rows="4"
          />
          <label>Job Description</label>
        </div>

        {/* Job Type */}
        <div className="form-input w-full sm:flex-1 relative">
          <input
            type="text"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required
            className="input"
          />
          <label>Job Type</label>
        </div>

        {/* Contact Email */}
        <div className="form-input w-full sm:flex-1 relative">
          <input
            type="email"
            value={companyContactEmail}
            onChange={(e) => setCompanyContactEmail(e.target.value)}
            required
            className="input"
          />
          <label>Contact Email</label>
        </div>

        {/* Company Location */}
        <div className="form-input w-full sm:flex-1 relative">
          <input
            type="text"
            value={companyLocation}
            onChange={(e) => setCompanyLocation(e.target.value)}
            required
            className="input"
          />
          <label>Company Location</label>
        </div>

        {/* Job Location */}
        <div className="form-input w-full sm:flex-1 relative">
          <input
            type="text"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            required
            className="input"
          />
          <label>Job Location</label>
        </div>
      </div>

      {/* Second Grid (Min/Max Salary, Experience Level, Employment Type, etc.) */}
      <div className="flex flex-col gap-3">
        {/* Min Salary */}
        <div className='flex items-center gap-x-2'>
      <div className="form-input w-full sm:flex-1 relative">
        <input
          type="number"
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
          required
          className="input"
        />
        <label >Min Salary</label>

      </div>

      <div className="form-input w-full sm:flex-1 relative">
        <input
          type="number"
          value={maxSalary}
          onChange={(e) => setMaxSalary(e.target.value)}
          required
          className="input"
        />
        <label >Max Salary</label>

      </div>
        </div> 



        {/* Experience Level */}
        <div className="form-input w-full sm:flex-1 relative">
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            required
            className="input"
          >
            <option value="" disabled hidden></option>
            {[
              'Entry Level',
              'Junior',
              'Mid Level',
              'Senior',
              'Lead',
              'Manager',
              'Director',
              'VP',
              'C-Level',
            ].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <label>Experience Level</label>
        </div>

        {/* Employment Type */}
        <div className="form-input w-full sm:flex-1 relative">
          <select
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            required
            className="input"
          >
            <option value="" disabled hidden></option>
            {[
              'Full-Time',
              'Part-Time',
              'Contract',
              'Internship',
              'Temporary',
              'Freelance',
              'Seasonal',
            ].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <label>Employment Type</label>
        </div>

        {/* Education Level */}
        <div className="form-input w-full sm:flex-1 relative">
          <select
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            required
            className="input"
          >
            <option value="" disabled hidden></option>
            <option value="High School Diploma">High School Diploma</option>
            <option value="Associate's Degree">Associate's Degree</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Doctorate Degree">Doctorate Degree</option>
            <option value="Postdoctoral Research">Postdoctoral Research</option>
            <option value="Certificate Program">Certificate Program</option>
            <option value="Diploma Program">Diploma Program</option>
            <option value="Professional Qualification">Professional Qualification</option>
          </select>
          <label>Education Level</label>
        </div>

        {/* Requirements */}
        <div className="form-input w-full sm:flex-1 relative">
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            required
            className="input min-h-32"
            rows="4"
          />
          <label>Requirements</label>
        </div>

        {/* Responsibilities */}
        <div className="form-input w-full sm:flex-1 relative">
          <textarea
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            required
            className="input min-h-32"
            rows="4"
          />
          <label>Responsibilities</label>
        </div>
      </div>
    </div>

    <button type="submit" className="mt-8 btn btn-primary">
      Create Job
    </button>
  </form>

  {/* Success Modal */}
  {successModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="card p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-primary">Job Created Successfully!</h2>
        <p>Your job has been posted.</p>
        <button
          className="mt-4 w-full btn btn-primary"
          onClick={() => setSuccessModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  )}
</div>

  );
};

export default AddJobForm;



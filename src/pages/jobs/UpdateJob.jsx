import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobById, updateJob, updateJobLogo } from '../../redux/jobSlice';

const UpdateJob = ({ isOpen, onClose, jobId }) => {
  const dispatch = useDispatch();
  const { selectedJob, status } = useSelector((state) => state.jobs);
  const user = useSelector((state) => state.user.user);

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
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(''); // State for the logo preview

  useEffect(() => {
    if (isOpen && jobId) {
      dispatch(fetchJobById(jobId));
    }
  }, [dispatch, isOpen, jobId]);

  useEffect(() => {
    if (selectedJob) {
      setJobTitle(selectedJob.jobTitle);
      setCompanyName(selectedJob.company.name);
      setCompanyDescription(selectedJob.company.description);
      setCompanyContactEmail(selectedJob.company.contactEmail);
      setCompanyLocation(selectedJob.company.location);
      setJobLocation(selectedJob.location);
      setMinSalary(selectedJob.salary.min);
      setMaxSalary(selectedJob.salary.max);
      setExperienceLevel(selectedJob.experienceLevel);
      setEmploymentType(selectedJob.employmentType);
      setEducationLevel(selectedJob.educationLevel);
      setJobType(selectedJob.jobType);
      setRequirements(selectedJob.requirements);
      setResponsibilities(selectedJob.responsibilities);
      setLogoPreview(selectedJob.company.logo?.url || ''); // Fallback if no logo exists
    }
  }, [selectedJob]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);

      // Create a URL for the selected image and set it as the preview
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  };

  const handleJobUpdate = async (e) => {
    e.preventDefault();
    const jobData = {
      jobTitle,
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail: companyContactEmail,
        logo: logoFile ? null : selectedJob.company.logo, // Keep the old logo if no new logo is provided
      },
      location: jobLocation,
      salary: { min: minSalary, max: maxSalary },
      experienceLevel,
      employmentType,
      educationLevel,
      jobType,
      requirements,
      responsibilities,
    };

    // If there's a logo file, upload it
    if (logoFile) {
      await dispatch(updateJobLogo({ id: jobId, logoFile, token: user.token }));
    }

    // Dispatch the job update
    await dispatch(updateJob({ id: jobId, jobData }));

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="card p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold form-input mb-4">Update Job</h2>

        {status === 'loading' && <div>Loading...</div>}
        {status === 'failed' && <div>Error: Failed to load job details</div>}

        {selectedJob && (
          <form onSubmit={handleJobUpdate}>
            {/* Job Title */}
            <div className="form-input w-full sm:flex-1 relative">
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="input"
                required
              />
              <label>Job Title</label>
            </div>

            {/* Company Name */}
            <div className="form-input w-full sm:flex-1 relative">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="input"
                required
              />
              <label>Company Name</label>
            </div>

            {/* Company Description */}
            <div className="form-input w-full sm:flex-1 relative">
              <textarea
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                className="input"
                required
              />
              <label>Company Description</label>
            </div>

            {/* Company Contact Email */}
            <div className="form-input w-full sm:flex-1 relative">
              <input
                type="email"
                value={companyContactEmail}
                onChange={(e) => setCompanyContactEmail(e.target.value)}
                className="input"
                required
              />
              <label>Company Contact Email</label>
            </div>

            {/* Job Location */}
            <div className="form-input w-full sm:flex-1 relative">
              <input
                type="text"
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
                className="input"
                required
              />
              <label>Job Location</label>
            </div>

            {/* Salary Range */}
            <div className="form-input w-full sm:flex-1 relative">
              <div className="flex space-x-4">
                <input
                  type="number"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  placeholder="Min"
                  className="input"
                  required
                />
                <input
                  type="number"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  placeholder="Max"
                  className="input"
                  required
                />
              </div>
            </div>

            {/* Experience Level */}
            <div className="form-input w-full sm:flex-1 relative">
              <input
                type="text"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="input"
                required
              />
              <label>Experience Level</label>
            </div>

            {/* Employment Type */}
            <div className="form-input w-full sm:flex-1 relative">
              <input
                type="text"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="input"
                required
              />
              <label>Employment Type</label>
            </div>

            {/* Education Level */}
            <div className="form-input w-full sm:flex-1 relative">
              <input
                type="text"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="input"
                required
              />
              <label>Education Level</label>
            </div>

            {/* Job Type */}
            <div className="form-input w-full sm:flex-1 relative">
              <input
                type="text"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="input"
                required
              />
              <label>Job Type</label>
            </div>

            {/* Requirements */}
            <div className="form-input w-full sm:flex-1 relative">
              <label>Requirements</label>
              <textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="input"
                required
              />
            </div>

            {/* Responsibilities */}
            <div className="form-input w-full sm:flex-1 relative">
              <textarea
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
                className="input"
                required
              />
              <label>Responsibilities</label>
            </div>

            {/* Update Logo */}
            <div className="form-input w-full sm:flex-1 relative">
              <label>Update Company Logo</label>
              {logoPreview && (
                <div className="mb-4">
                  {/* Displaying the logo preview */}
                  <img
                    src={logoPreview}
                    alt="Company Logo Preview"
                    className="h-32 w-auto object-contain mx-auto"
                  />
                </div>
              )}
              <input
                type="file"
                onChange={handleLogoChange}
                accept="image/*" // Only accept image files
                className="mt-2 border border-gray-300 rounded-md px-4 py-2 text-gray-700"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-4 w-full flex-center-between">
              <button type="submit" className="btn btn-primary">
                Update Job
              </button>

              <button onClick={onClose} className="btn btn-primary-light">
                Close
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateJob;



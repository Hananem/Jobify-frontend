import React from 'react';

const FilterSidebar = ({ filters, handleCheckboxChange }) => {
  const filterOptions = {
    experienceLevel: ['Entry Level', 'Junior', 'Mid Level', 'Senior', 'Lead', 'Manager', 'Director', 'VP', 'C-Level'],
    employmentType: ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Temporary', 'Freelance', 'Seasonal'],
    educationLevel: [
      "High School Diploma",
      "Associate's Degree",
      "Bachelor's Degree",
      "Master's Degree",
      "Doctorate Degree",
      "Postdoctoral Research",
      "Certificate Program",
      "Diploma Program",
      "Professional Qualification"
    ],
  };

  return (
    <div className="p-4 border-r card border-gray-200">
      {/* Experience Level Filters */}
      <div className="mt-6">
  <h1 className="text-lg font-semibold capitalize">Experience Level</h1>
  {filterOptions.experienceLevel.map((level) => (
    <div className="mt-3" key={level}>
      <div className="flex-center-between">
        <div className="input-check">
          <input
            type="checkbox"
            id={level}
            name="experienceLevel"
            value={level}
            checked={filters.experienceLevel.includes(level)}
            onChange={(e) => handleCheckboxChange(e)}
          />
          <label htmlFor={level} className="capitalize">
            {level}
          </label>
        </div>
      </div>
    </div>
  ))}
</div>


      {/* Employment Type Filters */}
   <div className="mt-6">
  <h1 className="text-lg font-semibold capitalize">Employment Type</h1>
  {filterOptions.employmentType.map((type) => (
    <div className="mt-3" key={type}>
      <div className="flex-center-between">
        <div className="input-check">
          <input
            type="checkbox"
            id={type}
            name="employmentType"
            value={type}
            checked={filters.employmentType.includes(type)}
            onChange={(e) => handleCheckboxChange(e)}
          />
          <label htmlFor={type} className="capitalize">
            {type}
          </label>
        </div>
      </div>
    </div>
  ))}
</div>


      {/* Education Level Filters */}
      <div className="mt-6">
      <h1 className="text-lg font-semibold capitalize">Education Level</h1>
      {filterOptions.educationLevel.map((level) => (
        <div className="mt-3" key={level}>
          <div className="flex-center-between">
            <div className="input-check">
              <input
                type="checkbox"
                id={level}
                name="educationLevel"
                value={level}
                checked={filters.educationLevel.includes(level)}
                onChange={(e) => handleCheckboxChange(e)}
              />
              <label htmlFor={level} className="capitalize">
                {level}
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    </div>
  );
};

export default FilterSidebar;




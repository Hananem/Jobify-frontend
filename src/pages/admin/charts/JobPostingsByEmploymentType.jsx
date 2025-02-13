import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import 'tailwindcss/tailwind.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const JobPostingsByEmploymentType = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPostingsByEmploymentType = async () => {
      try {
        const response = await axios.get('https://jobify-kefc.onrender.com/api/charts/job-postings-by-employment-type');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching job postings by employment type', error);
      }
    };

    fetchPostingsByEmploymentType();
  }, []);

  const chartData = {
    labels: data.map(item => item._id), // Employment types (e.g., Full-time, Part-time)
    datasets: [
      {
        label: 'Number of Postings',
        data: data.map(item => item.count),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        barThickness: 15,
      }
    ]
  };

  return (
    <div className="p-6 card rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Job Postings by Employment Type</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default JobPostingsByEmploymentType;
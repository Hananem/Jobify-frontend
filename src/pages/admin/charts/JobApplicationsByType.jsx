// JobApplicationsByType.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const JobApplicationsByType = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jobify-kefc.onrender.com/api/charts/applications-by-job-type');
        const data = response.data;

        const jobTypes = data.map(item => item._id);
        const applications = data.map(item => item.totalApplications);

        setChartData({
          labels: jobTypes,
          datasets: [
            {
              label: 'Total Applications',
              data: applications,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              barThickness: 15,
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 card shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Job Applications by Job Type</h2>
      <div className="h-80">
        <Bar
          data={chartData}
          options={{
            indexAxis: 'y', // Horizontal bar chart
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `${tooltipItem.label}: ${tooltipItem.raw} applications`;
                  },
                },
              },
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Applications by Job Type',
              },
            },
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                ticks: {
                  autoSkip: false, // Ensure all labels are displayed
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default JobApplicationsByType;
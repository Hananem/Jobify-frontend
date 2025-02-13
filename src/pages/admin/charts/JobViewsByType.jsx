// JobViewsByType.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const JobViewsByType = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from backend
        const response = await axios.get('https://jobify-kefc.onrender.com/api/charts/job-views-by-type');
        const data = response.data;

        // Calculate total views
        const totalViews = data.reduce((acc, item) => acc + item.totalViews, 0);

        // Process data for chart
        const jobTypes = data.map(item => item._id);
        const views = data.map(item => item.totalViews);

        // Calculate percentages
        const percentages = views.map(view => ((view / totalViews) * 100).toFixed(2));

        setChartData({
          labels: jobTypes.map((type, index) => `${type}: ${percentages[index]}%`),
          datasets: [
            {
              label: 'Total Views',
              data: views,
              backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(153, 102, 255, 0.6)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
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
      <h2 className="text-2xl font-bold text-center mb-6">Job Views by Type</h2>
      <div className="h-80">
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `${tooltipItem.label}: ${tooltipItem.raw} views (${tooltipItem.raw}%)`;
                  }
                }
              },
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Views by Job Type',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default JobViewsByType;
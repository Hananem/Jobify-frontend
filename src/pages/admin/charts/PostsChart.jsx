// PostsChart.js
// PostsChart.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsByTime } from '../../../redux/chartsSlice'; // Adjust the path as necessary
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const PostsChart = () => {
  const dispatch = useDispatch();
  const postsByTime = useSelector((state) => state.charts.postsByTime);

  useEffect(() => {
    // Fetch data without passing period
    dispatch(fetchPostsByTime());
  }, [dispatch]);

  const data = {
    labels: postsByTime.map((post) => post.date), // Adjust the field names as per your API response
    datasets: [
      {
        label: 'Posts Over Time',
        data: postsByTime.map((post) => post.count), // Adjust the field names as per your API response
        backgroundColor: 'rgba(34, 197, 94, 0.5)', // Tailwind green color
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Posts by Time Period',
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">Posts Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PostsChart;
